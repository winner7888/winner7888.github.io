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
            var card = document.createElement('div');
            card.className = 'honor-card';
            card.dataset.category = h.category;
            card.dataset.honorImage = h.image;
            card.dataset.honorTitle = h.title;
            card.dataset.honorDesc = h.desc;
            card.dataset.honorDate = h.date;
            card.innerHTML = '<div class="honor-image-container">' +
                '<img class="honor-image" src="' + h.image + '" alt="' + h.title + '" loading="lazy">' +
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

        // 从数据渲染奖项卡片
        function renderHonors(filter, sort) {
            var container = document.getElementById('honors-container');
            if (!container || typeof honorsData === 'undefined') return;
            
            var filtered = filter === 'all' ? honorsData.slice() : honorsData.filter(function(h) { return h.category === filter; });
            
            if (sort !== 'default') {
                filtered.sort(function(a, b) {
                    var dateA = new Date(a.date.replace(/\./g, '-'));
                    var dateB = new Date(b.date.replace(/\./g, '-'));
                    return sort === 'desc' ? dateB - dateA : dateA - dateB;
                });
            }
            
            container.innerHTML = '';
            var isTimeline = true;
            if (isTimeline) {
                container.className = 'honors-container timeline-view';
                // 按日期分组
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
            if (!honorExpanded && filtered.length > HONORS_PREVIEW) {
                var allCards = container.querySelectorAll('.honor-card');
                allCards.forEach(function(card, i) {
                    if (i >= HONORS_PREVIEW) card.style.display = 'none';
                });
                // 隐藏所有卡片都被隐藏的日期组
                container.querySelectorAll('.timeline-date-group').forEach(function(group) {
                    var visibleCards = group.querySelectorAll('.honor-card:not([style*="display: none"])');
                    if (visibleCards.length === 0) group.style.display = 'none';
                });
                loadMoreBtn.style.display = 'inline-flex';
                loadMoreBtn.className = 'load-more-btn';
                loadMoreBtn.innerHTML = '<i class="fas fa-chevron-down"></i> 展开全部 ' + filtered.length + ' 项奖项';
            } else if (loadMoreBtn) {
                loadMoreBtn.style.display = filtered.length > HONORS_PREVIEW ? 'inline-flex' : 'none';
                if (filtered.length > HONORS_PREVIEW) {
                    loadMoreBtn.className = 'load-more-btn expanded';
                    loadMoreBtn.innerHTML = '<i class="fas fa-chevron-up"></i> 收起奖项';
                }
            }

            // 更新计数
            var countEl = document.getElementById('honorsCount');
            if (countEl) {
                var catName = categoryNames[filter] || '全部';
                var shown = (!honorExpanded && filtered.length > HONORS_PREVIEW) ? HONORS_PREVIEW : filtered.length;
                countEl.innerHTML = '当前显示：<strong>' + shown + '</strong> / ' + filtered.length + ' 项' + (filter !== 'all' ? '（' + catName + '）' : '');
            }

            // 绑定点击事件
            container.querySelectorAll('.honor-card').forEach(function(card) {
                card.addEventListener('click', function() {
                    openLightbox(card.dataset.honorImage, card.dataset.honorTitle, card.dataset.honorDesc, card.dataset.honorDate);
                });
            });

            // 重建时间线导航
            if (typeof window.rebuildTimelineNav === 'function') window.rebuildTimelineNav();
        }

        // 打字机效果
        (function() {
            var texts = [
                '计算机科学与技术 · 专业TOP 0.52%',
                'JCR一区论文学生一作 · 发明专利',
                '全国英语竞赛特等奖 · CET-6 615分',
                '中共党员 · 东北大学'
            ];
            var el = document.getElementById('typingText');
            if (!el) return;
            var textIdx = 0, charIdx = 0, deleting = false;
            function type() {
                var current = texts[textIdx];
                if (!deleting) {
                    el.textContent = current.substring(0, charIdx + 1);
                    charIdx++;
                    if (charIdx >= current.length) {
                        setTimeout(function() { deleting = true; type(); }, 2000);
                        return;
                    }
                    setTimeout(type, 80);
                } else {
                    el.textContent = current.substring(0, charIdx - 1);
                    charIdx--;
                    if (charIdx <= 0) {
                        deleting = false;
                        textIdx = (textIdx + 1) % texts.length;
                        setTimeout(type, 400);
                        return;
                    }
                    setTimeout(type, 40);
                }
            }
            setTimeout(type, 800);
        })();

        // 数字滚动动画
        function animateCounters() {
            document.querySelectorAll('.counter').forEach(function(el) {
                var target = parseInt(el.dataset.target);
                var duration = 1500;
                var start = performance.now();
                function step(now) {
                    var progress = Math.min((now - start) / duration, 1);
                    var eased = 1 - Math.pow(1 - progress, 3);
                    el.textContent = Math.round(target * eased);
                    if (progress < 1) requestAnimationFrame(step);
                }
                requestAnimationFrame(step);
            });
        }
        setTimeout(animateCounters, 500);

        // 筛选和排序功能
        document.addEventListener('DOMContentLoaded', function() {
            // 渲染课程
            renderCourses();
            // 初始渲染奖项
            renderHonors('all', 'desc');
            
            const filterTabs = document.querySelectorAll('.filter-tab');
            const sortButtons = document.querySelectorAll('.sort-btn');
            
            let currentFilter = 'all';
            let currentSort = 'desc';
            
            // 加载更多按钮
            document.getElementById('loadMoreBtn').addEventListener('click', function() {
                honorExpanded = !honorExpanded;
                renderHonors(currentFilter, currentSort);
            });

            filterTabs.forEach(tab => {
                tab.addEventListener('click', function() {
                    honorExpanded = false;
                    if (this.classList.contains('sort-btn')) {
                        sortButtons.forEach(btn => btn.classList.remove('active'));
                        this.classList.add('active');
                        currentSort = this.dataset.sort;
                        renderHonors(currentFilter, currentSort);
                    } else if (this.dataset.filter) {
                        document.querySelectorAll('.filter-tab[data-filter]').forEach(t => t.classList.remove('active'));
                        this.classList.add('active');
                        currentFilter = this.dataset.filter;
                        renderHonors(currentFilter, currentSort);
                    }
                });
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
                el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                observer.observe(el);
            });

            // 图片懒加载（科研图片）
            document.querySelectorAll('.research-image').forEach(function(img) {
                img.setAttribute('loading', 'lazy');
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

            // 暗色模式
            var darkToggle = document.getElementById('darkToggle');
            var savedTheme = localStorage.getItem('theme');
            if (savedTheme === 'dark') {
                document.documentElement.setAttribute('data-theme', 'dark');
                darkToggle.innerHTML = '<i class="fas fa-sun"></i>';
            }
            darkToggle.addEventListener('click', function() {
                var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
                if (isDark) {
                    document.documentElement.removeAttribute('data-theme');
                    localStorage.setItem('theme', 'light');
                    darkToggle.innerHTML = '<i class="fas fa-moon"></i>';
                } else {
                    document.documentElement.setAttribute('data-theme', 'dark');
                    localStorage.setItem('theme', 'dark');
                    darkToggle.innerHTML = '<i class="fas fa-sun"></i>';
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

            // 滚动时显示/隐藏 + 高亮当前
            window.addEventListener('scroll', function() {
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

            // 彩蛋：双击头像触发烟花
            var photo = document.querySelector('.profile-photo');
            if (photo) {
                photo.addEventListener('dblclick', function(e) {
                    e.preventDefault();
                    var colors = ['#3a86ff', '#8338ec', '#ff006e', '#ffbe0b', '#06d6a0', '#fb5607'];
                    for (var i = 0; i < 40; i++) {
                        var piece = document.createElement('div');
                        piece.className = 'confetti-piece';
                        var color = colors[Math.floor(Math.random() * colors.length)];
                        var size = Math.random() * 8 + 6;
                        var startX = e.clientX + (Math.random() - 0.5) * 100;
                        var startY = e.clientY + (Math.random() - 0.5) * 50;
                        var shapes = ['50%', '0%', '30%'];
                        piece.style.cssText = 'left:' + startX + 'px;top:' + startY + 'px;width:' + size + 'px;height:' + size + 'px;background:' + color + ';border-radius:' + shapes[Math.floor(Math.random() * 3)] + ';animation-duration:' + (1 + Math.random()) + 's;';
                        document.body.appendChild(piece);
                        setTimeout(function(p) { p.remove(); }.bind(null, piece), 2000);
                    }
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
        });
