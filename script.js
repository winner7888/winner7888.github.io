        // 滚动进度条
        window.addEventListener('scroll', function() {
            var scrollTop = document.documentElement.scrollTop;
            var scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            var progress = (scrollTop / scrollHeight) * 100;
            document.getElementById('scrollProgress').style.width = progress + '%';
        });

        // 返回顶部按钮逻辑
        (function() {
            var btn = document.getElementById('backToTop');
            window.addEventListener('scroll', function() {
                if (window.scrollY > 600) {
                    btn.classList.add('visible');
                } else {
                    btn.classList.remove('visible');
                }
            });
            btn.addEventListener('click', function() {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        })();

        // 灯箱功能
        function openLightbox(image, title, desc, date) {
            document.getElementById('lightboxImg').src = image;
            document.getElementById('lightboxTitle').textContent = title;
            document.getElementById('lightboxDesc').textContent = desc;
            document.getElementById('lightboxDate').innerHTML = '<i class="fas fa-calendar-alt"></i> ' + date;
            document.getElementById('lightbox').classList.add('active');
            document.body.style.overflow = 'hidden';
        }
        function closeLightbox() {
            document.getElementById('lightbox').classList.remove('active');
            document.body.style.overflow = '';
        }

        // 类别名称映射
        var categoryNames = { all: '全部', ai: '专业竞赛', math: '数学建模', awards: '荣誉称号', scholarship: '奖学金', language: '语言能力', activities: '校园活动' };

        // 创建奖项卡片
        function createHonorCard(h) {
            var icon = h.icon || 'fas fa-medal';
            var catName = categoryNames[h.category] || h.category;
            var card = document.createElement('div');
            card.className = 'honor-card';
            card.dataset.category = h.category;
            card.dataset.honorImage = h.image;
            card.dataset.honorTitle = h.title;
            card.dataset.honorDesc = h.desc;
            card.dataset.honorDate = h.date;
            card.innerHTML = '<div class="honor-image-container">' +
                '<img class="honor-image" src="' + h.image + '" alt="' + h.title + '" loading="lazy">' +
                '<span class="honor-category-tag">' + catName + '</span>' +
                '</div>' +
                '<div class="honor-content">' +
                '<h3>' + h.title + '</h3>' +
                '<p>' + h.desc + '</p>' +
                '<div class="honor-badge">' +
                '<i class="' + icon + '"></i>' +
                '<span>' + h.date + '</span>' +
                '</div></div>';
            return card;
        }

        var honorExpanded = false;
        var HONORS_PREVIEW = 6;
        var timelineEnabled = false;
        var userInteracted = false; // 用户是否操作过筛选/排序/视图

        // 从数据渲染奖项卡片（activeFilters 为分类数组，如 ['ai','math']）
        function renderHonors(activeFilters, sort) {
            var container = document.getElementById('honors-container');
            if (!container || typeof honorsData === 'undefined') return;

            // 多选筛选
            var filtered = activeFilters.length === 0 ? [] : honorsData.filter(function(h) {
                return activeFilters.indexOf(h.category) !== -1;
            });

            // 排序
            if (sort !== 'default' && filtered.length > 0) {
                filtered.sort(function(a, b) {
                    var dateA = new Date(a.date.replace(/\./g, '-'));
                    var dateB = new Date(b.date.replace(/\./g, '-'));
                    return sort === 'desc' ? dateB - dateA : dateA - dateB;
                });
            }

            container.innerHTML = '';

            // 空状态
            if (filtered.length === 0) {
                container.className = 'honors-container';
                var empty = document.createElement('div');
                empty.className = 'honors-empty';
                empty.innerHTML = '<i class="fas fa-inbox"></i><p>暂无匹配的奖项</p>';
                container.appendChild(empty);
                document.getElementById('loadMoreBtn').style.display = 'none';
                var countEl = document.getElementById('honorsCount');
                if (countEl) countEl.innerHTML = '当前显示：<strong>0</strong> 项';
                // 隐藏时间线导航
                document.getElementById('timelineNav').classList.remove('visible');
                return;
            }

            // 时间线视图 or 普通网格
            if (timelineEnabled) {
                container.className = 'honors-container timeline-view';
                var groups = {};
                filtered.forEach(function(h) { var k = h.date; if (!groups[k]) groups[k] = []; groups[k].push(h); });
                Object.keys(groups).forEach(function(dateKey) {
                    var group = document.createElement('div');
                    group.className = 'timeline-date-group';
                    var label = document.createElement('div');
                    label.className = 'timeline-date-label';
                    label.innerHTML = '<i class="fas fa-calendar-alt"></i> ' + dateKey;
                    group.appendChild(label);
                    var grid = document.createElement('div');
                    grid.className = 'cards-grid';
                    groups[dateKey].forEach(function(h) {
                        grid.appendChild(createHonorCard(h));
                    });
                    group.appendChild(grid);
                    container.appendChild(group);
                });
            } else {
                container.className = 'honors-container';
                filtered.forEach(function(h) {
                    container.appendChild(createHonorCard(h));
                });
            }

            // 加载更多逻辑
            var loadMoreBtn = document.getElementById('loadMoreBtn');
            var shouldFold = !honorExpanded && !userInteracted && filtered.length > HONORS_PREVIEW;
            if (shouldFold) {
                var allCards = container.querySelectorAll('.honor-card');
                allCards.forEach(function(card, i) {
                    if (i >= HONORS_PREVIEW) card.style.display = 'none';
                });
                if (timelineEnabled) {
                    container.querySelectorAll('.timeline-date-group').forEach(function(group) {
                        var visibleCards = group.querySelectorAll('.honor-card:not([style*="display: none"])');
                        if (visibleCards.length === 0) group.style.display = 'none';
                    });
                }
                loadMoreBtn.style.display = 'inline-flex';
                loadMoreBtn.className = 'load-more-btn';
                loadMoreBtn.innerHTML = '<i class="fas fa-chevron-down"></i> 展开全部 ' + filtered.length + ' 项奖项';
            } else if (loadMoreBtn) {
                if (userInteracted) {
                    loadMoreBtn.style.display = 'none';
                } else if (filtered.length > HONORS_PREVIEW) {
                    loadMoreBtn.style.display = 'inline-flex';
                    loadMoreBtn.className = 'load-more-btn expanded';
                    loadMoreBtn.innerHTML = '<i class="fas fa-chevron-up"></i> 收起奖项';
                } else {
                    loadMoreBtn.style.display = 'none';
                }
            }

            // 更新计数
            var countEl = document.getElementById('honorsCount');
            if (countEl) {
                var shown = shouldFold ? HONORS_PREVIEW : filtered.length;
                var catDesc = '';
                if (activeFilters.length < Object.keys(categoryNames).length - 1) {
                    // 不是全选，显示分类名
                    catDesc = '（' + activeFilters.map(function(f) { return categoryNames[f] || f; }).join('、') + '）';
                }
                countEl.innerHTML = '当前显示：<strong>' + shown + '</strong> / ' + filtered.length + ' 项' + catDesc;
            }

            // 绑定点击事件
            container.querySelectorAll('.honor-card').forEach(function(card) {
                card.addEventListener('click', function() {
                    openLightbox(card.dataset.honorImage, card.dataset.honorTitle, card.dataset.honorDesc, card.dataset.honorDate);
                });
            });

            // 重建时间线导航（仅在时间线模式下）
            if (timelineEnabled && typeof window.rebuildTimelineNav === 'function') {
                window.rebuildTimelineNav();
            } else {
                document.getElementById('timelineNav').classList.remove('visible');
            }
        }

        // 打字机效果（逐行打出，保留不删除）
        (function() {
            var texts = [
                '计算机科学与技术 · 专业排名Top 0.52%',
                'JCR一区论文学生一作 · 发明专利',
                '全国大学生英语竞赛特等奖 · CET-6 615分'
            ];
            var container = document.getElementById('typingLines');
            if (!container) return;
            var textIdx = 0, charIdx = 0;
            var currentLine = null;

            function startLine() {
                currentLine = document.createElement('div');
                currentLine.className = 'typing-line';
                currentLine.style.minHeight = '1.8em';
                container.appendChild(currentLine);
            }

            function type() {
                if (textIdx >= texts.length) {
                    // 所有行打完，添加闪烁光标
                    var cursor = document.createElement('span');
                    cursor.className = 'typing-cursor';
                    currentLine.appendChild(cursor);
                    return;
                }
                var current = texts[textIdx];
                if (charIdx === 0) startLine();
                charIdx++;
                currentLine.textContent = current.substring(0, charIdx);
                if (charIdx >= current.length) {
                    // 当前行打完
                    currentLine.classList.add('done');
                    textIdx++;
                    charIdx = 0;
                    setTimeout(type, 400);
                    return;
                }
                setTimeout(type, 60);
            }
            setTimeout(type, 800);
        })();

        // 数字滚动动画（更快更有冲击力）
        function animateCounters() {
            document.querySelectorAll('.counter').forEach(function(el) {
                var target = parseInt(el.dataset.target);
                var duration = 1000; // 更快
                var start = performance.now();
                function step(now) {
                    var progress = Math.min((now - start) / duration, 1);
                    // 强弹性效果
                    var eased = 1 - Math.pow(1 - progress, 2);
                    el.textContent = Math.round(target * eased);
                    if (progress < 1) {
                        requestAnimationFrame(step);
                    } else {
                        // 数字到位后平滑归位
                        el.style.transform = 'scale(1.15)';
                        el.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
                        setTimeout(function() { el.style.transform = 'scale(1)'; }, 200);
                    }
                }
                requestAnimationFrame(step);
            });
        }
        setTimeout(animateCounters, 300);

        // 渲染课程（数据来自 courses.js）
        function renderCourses() {
            var container = document.getElementById('course-grid');
            if (!container || typeof coursesData === 'undefined') return;
            container.innerHTML = '';
            coursesData.forEach(function(c) {
                var div = document.createElement('div');
                div.className = 'course-item';
                div.innerHTML = '<span class="course-name">' + c.name + '</span><span class="course-grade">' + c.grade + '</span>';
                container.appendChild(div);
            });
            // 省略号：表示还有更多课程
            var more = document.createElement('div');
            more.className = 'course-item';
            more.innerHTML = '<span class="course-name">···</span><span class="course-grade"></span>';
            more.style.opacity = '0.5';
            more.style.cursor = 'default';
            container.appendChild(more);
        }

        // 筛选和排序功能
        document.addEventListener('DOMContentLoaded', function() {
            // 渲染课程
            renderCourses();

            // 所有分类 key（不含 'all'）
            var allCategoryKeys = Object.keys(categoryNames).filter(function(k) { return k !== 'all'; });
            var currentSort = 'default';
            var activeFilters = allCategoryKeys.slice(); // 默认全选
            var sortButtons = document.querySelectorAll('.sort-btn');
            var defaultSortBtn = document.querySelector('.sort-btn[data-sort="default"]');

            // 获取当前激活的筛选数组
            function getActiveFilters() {
                var tabs = document.querySelectorAll('.multi-select .filter-tab[data-filter]');
                var active = [];
                tabs.forEach(function(tab) {
                    if (tab.classList.contains('active') && tab.dataset.filter !== 'all') {
                        active.push(tab.dataset.filter);
                    }
                });
                return active;
            }

            // 启用/禁用排序按钮
            function setSortEnabled(enabled) {
                sortButtons.forEach(function(btn) {
                    if (enabled) {
                        btn.classList.remove('disabled');
                    } else {
                        btn.classList.add('disabled');
                        btn.classList.remove('active');
                    }
                });
                if (enabled) {
                    // 时间线模式下禁用"默认"按钮，自动选中"最新"
                    defaultSortBtn.classList.add('disabled');
                    defaultSortBtn.classList.remove('active');
                } else {
                    defaultSortBtn.classList.remove('disabled');
                    defaultSortBtn.classList.add('active');
                    currentSort = 'default';
                }
            }

            // 初始渲染奖项（默认排序）
            renderHonors(activeFilters, 'default');

            // 加载更多按钮
            document.getElementById('loadMoreBtn').addEventListener('click', function() {
                honorExpanded = !honorExpanded;
                renderHonors(getActiveFilters(), currentSort);
            });

            // 分类多选逻辑
            var categoryTabs = document.querySelectorAll('.multi-select .filter-tab[data-filter]');
            var allTab = document.querySelector('.multi-select .filter-tab[data-filter="all"]');

            categoryTabs.forEach(function(tab) {
                tab.addEventListener('click', function() {
                    userInteracted = true;
                    honorExpanded = false;
                    var filter = this.dataset.filter;

                    if (filter === 'all') {
                        // 切换全选/全不选
                        var individualTabs = document.querySelectorAll('.multi-select .filter-tab[data-filter]:not([data-filter="all"])');
                        var allActive = true;
                        individualTabs.forEach(function(t) {
                            if (!t.classList.contains('active')) allActive = false;
                        });
                        if (allActive) {
                            // 当前全选 → 全不选
                            categoryTabs.forEach(function(t) { t.classList.remove('active'); });
                            allTab.classList.remove('active');
                        } else {
                            // 当前非全选 → 全选
                            categoryTabs.forEach(function(t) { t.classList.add('active'); });
                            allTab.classList.add('active');
                        }
                    } else {
                        // 切换单个分类
                        this.classList.toggle('active');
                        // 检查是否全选
                        var individualTabs = document.querySelectorAll('.multi-select .filter-tab[data-filter]:not([data-filter="all"])');
                        var allActive = true;
                        individualTabs.forEach(function(t) {
                            if (!t.classList.contains('active')) allActive = false;
                        });
                        if (allActive) {
                            allTab.classList.add('active');
                        } else {
                            allTab.classList.remove('active');
                        }
                    }

                    renderHonors(getActiveFilters(), currentSort);
                });
            });

            // 排序按钮（禁用态不可点击，保持单选）
            sortButtons.forEach(function(btn) {
                btn.addEventListener('click', function() {
                    if (this.classList.contains('disabled')) return;
                    userInteracted = true;
                    honorExpanded = false;
                    sortButtons.forEach(function(b) { b.classList.remove('active'); });
                    this.classList.add('active');
                    currentSort = this.dataset.sort;
                    renderHonors(getActiveFilters(), currentSort);
                });
            });

            // 视图切换（网格 / 时间线）
            var viewGrid = document.getElementById('viewGrid');
            var viewTimeline = document.getElementById('timelineToggle');

            viewGrid.addEventListener('click', function() {
                if (!timelineEnabled) return;
                userInteracted = true;
                timelineEnabled = false;
                viewGrid.classList.add('active');
                viewTimeline.classList.remove('active');
                honorExpanded = false;
                setSortEnabled(false);
                renderHonors(getActiveFilters(), currentSort);
            });

            viewTimeline.addEventListener('click', function() {
                if (timelineEnabled) return;
                userInteracted = true;
                timelineEnabled = true;
                viewTimeline.classList.add('active');
                viewGrid.classList.remove('active');
                honorExpanded = false;
                // 启用排序，自动选中"最新"
                setSortEnabled(true);
                sortButtons.forEach(function(b) { b.classList.remove('active'); });
                var descBtn = document.querySelector('.sort-btn[data-sort="desc"]');
                if (descBtn) descBtn.classList.add('active');
                currentSort = 'desc';
                renderHonors(getActiveFilters(), currentSort);
            });
            
            // 滚动动画
            const animateElements = document.querySelectorAll('.animate');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = 1;
                        entry.target.style.transform = 'translateY(0)';
                        // 技能进度条动画
                        var fill = entry.target.querySelector('.skill-fill');
                        if (fill && !fill.classList.contains('animated')) {
                            fill.classList.add('animated');
                            fill.style.width = fill.dataset.width;
                        }
                    }
                });
            }, { threshold: 0.1 });
            
            animateElements.forEach(el => {
                el.style.opacity = 0;
                el.style.transform = 'translateY(30px)';
                el.style.transition = 'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
                observer.observe(el);
            });

            // 向下滚动箭头点击
            var scrollArrow = document.querySelector('.scroll-arrow');
            if (scrollArrow) {
                scrollArrow.addEventListener('click', function() {
                    var education = document.getElementById('education');
                    if (education) {
                        education.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                });
            }

            // 暗色模式（Firefox 风格拨动开关）
            var darkToggleInput = document.getElementById('darkToggleInput');
            var savedTheme = localStorage.getItem('theme');
            if (savedTheme === 'dark') {
                document.documentElement.setAttribute('data-theme', 'dark');
                darkToggleInput.checked = true;
            }
            darkToggleInput.addEventListener('change', function() {
                if (this.checked) {
                    document.documentElement.setAttribute('data-theme', 'dark');
                    localStorage.setItem('theme', 'dark');
                } else {
                    document.documentElement.removeAttribute('data-theme');
                    localStorage.setItem('theme', 'light');
                }
            });

            // 灯箱关闭事件
            document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
            document.getElementById('lightbox').addEventListener('click', function(e) {
                if (e.target === this) closeLightbox();
            });
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') closeLightbox();
            });

            // 时间线快速导航
            var timelineNav = document.getElementById('timelineNav');
            var timelineNavItems = document.getElementById('timelineNavItems');
            var honorsSection = document.getElementById('honors');

            function buildTimelineNav() {
                timelineNavItems.innerHTML = '';
                var groups = document.querySelectorAll('.timeline-date-group');
                groups.forEach(function(group) {
                    if (group.style.display === 'none') return;
                    var label = group.querySelector('.timeline-date-label');
                    if (!label) return;
                    var item = document.createElement('div');
                    item.className = 'timeline-nav-item';
                    item.innerHTML = '<span class="nav-label">' + label.textContent.trim() + '</span>';
                    item.addEventListener('click', function() {
                        group.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    });
                    timelineNavItems.appendChild(item);
                });
            }

            // 暴露给renderHonors使用
            window.rebuildTimelineNav = function() { setTimeout(buildTimelineNav, 50); };
            // 初始构建
            setTimeout(buildTimelineNav, 100);

            // 滚动时显示/隐藏 + 高亮当前（仅在时间线模式下）
            window.addEventListener('scroll', function() {
                if (!timelineEnabled) return;
                var rect = honorsSection.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    timelineNav.classList.add('visible');
                    // 高亮当前可见的日期组
                    var navItems = timelineNavItems.querySelectorAll('.timeline-nav-item');
                    var groups = document.querySelectorAll('.timeline-date-group:not([style*="display: none"])');
                    var activeIdx = -1;
                    groups.forEach(function(g, i) {
                        var r = g.getBoundingClientRect();
                        if (r.top < window.innerHeight / 2) activeIdx = i;
                    });
                    navItems.forEach(function(n, i) {
                        if (i === activeIdx) {
                            n.querySelector('.nav-label').style.opacity = '1';
                            n.querySelector('.nav-label').style.transform = 'translateX(0)';
                            n.querySelector('.nav-label').style.background = 'linear-gradient(135deg, var(--primary), var(--secondary))';
                            n.querySelector('.nav-label').style.color = 'white';
                        } else {
                            n.querySelector('.nav-label').style.opacity = '';
                            n.querySelector('.nav-label').style.transform = '';
                            n.querySelector('.nav-label').style.background = '';
                            n.querySelector('.nav-label').style.color = '';
                        }
                    });
                } else {
                    timelineNav.classList.remove('visible');
                }
            });

            // 烟花彩蛋通用函数
            var confettiColors = ['#3a86ff', '#8338ec', '#ff006e', '#ffbe0b', '#06d6a0', '#fb5607'];
            function spawnConfetti(x, y, count, spread) {
                for (var i = 0; i < count; i++) {
                    var piece = document.createElement('div');
                    piece.className = 'confetti-piece';
                    var color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
                    var size = Math.random() * 8 + 6;
                    var startX = x + (Math.random() - 0.5) * spread;
                    var startY = y + (Math.random() - 0.5) * (spread / 2);
                    var shapes = ['50%', '0%', '30%'];
                    piece.style.cssText = 'left:' + startX + 'px;top:' + startY + 'px;width:' + size + 'px;height:' + size + 'px;background:' + color + ';border-radius:' + shapes[Math.floor(Math.random() * 3)] + ';animation-duration:' + (1 + Math.random()) + 's;';
                    document.body.appendChild(piece);
                    setTimeout(function(p) { p.remove(); }.bind(null, piece), 2500);
                }
            }

            // 彩蛋：双击头像触发烟花
            var photo = document.querySelector('.profile-photo');
            if (photo) {
                photo.addEventListener('dblclick', function(e) {
                    e.preventDefault();
                    spawnConfetti(e.clientX, e.clientY, 40, 100);
                });
            }

            // 平滑滚动
            document.querySelectorAll('nav a[href^="#"]').forEach(function(anchor) {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    var target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                });
            });

            // 导航栏滚动高亮
            var navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
            var sections = [];
            navLinks.forEach(function(link) {
                var sec = document.querySelector(link.getAttribute('href'));
                if (sec) sections.push({ el: sec, link: link });
            });

            function updateNavHighlight() {
                var scrollPos = window.scrollY + 120;
                var activeLink = null;
                for (var i = sections.length - 1; i >= 0; i--) {
                    if (sections[i].el.offsetTop <= scrollPos) {
                        activeLink = sections[i].link;
                        break;
                    }
                }
                navLinks.forEach(function(l) { l.classList.remove('nav-active'); });
                if (activeLink) activeLink.classList.add('nav-active');
            }
            window.addEventListener('scroll', updateNavHighlight);
            updateNavHighlight();

            // 滚到底部庆祝 Toast
            var celebrationShown = false;
            var celebrationToast = document.createElement('div');
            celebrationToast.className = 'celebration-toast';
            celebrationToast.innerHTML = '🎉 感谢你看到最后！';
            document.body.appendChild(celebrationToast);
            window.addEventListener('scroll', function() {
                if (celebrationShown) return;
                var scrollBottom = document.documentElement.scrollHeight - window.innerHeight - window.scrollY;
                if (scrollBottom < 200) {
                    celebrationShown = true;
                    celebrationToast.classList.add('show');
                    setTimeout(function() {
                        celebrationToast.classList.remove('show');
                    }, 4000);
                }
            });

            // Konami Code 彩蛋：↑↑↓↓←→←→BA
            var konamiCode = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
            var konamiIdx = 0;
            document.addEventListener('keydown', function(e) {
                if (e.key === konamiCode[konamiIdx]) {
                    konamiIdx++;
                    if (konamiIdx === konamiCode.length) {
                        konamiIdx = 0;
                        var msg = document.createElement('div');
                        msg.className = 'konami-message';
                        msg.innerHTML = '🎮 你发现了隐藏彩蛋！<br><span style="font-size:0.8em;font-weight:400;color:#a78bfa;">你是真正的高手 ✨</span>';
                        document.body.appendChild(msg);
                        setTimeout(function() { msg.classList.add('show'); }, 50);
                        // 全屏烟花（复用 spawnConfetti）
                        for (var i = 0; i < 80; i++) {
                            (function(idx) {
                                setTimeout(function() {
                                    spawnConfetti(
                                        Math.random() * window.innerWidth,
                                        Math.random() * window.innerHeight * 0.5,
                                        1, 20
                                    );
                                }, idx * 30);
                            })(i);
                        }
                        setTimeout(function() {
                            msg.classList.remove('show');
                            setTimeout(function() { msg.remove(); }, 500);
                        }, 3500);
                    }
                } else {
                    konamiIdx = 0;
                    if (e.key === konamiCode[0]) konamiIdx = 1;
                }
            });
        });
