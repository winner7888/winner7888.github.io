// 奖项数据 - 添加新奖项只需在下面数组中添加一条记录
// category 可选值: ai(专业竞赛), math(数学建模), awards(荣誉称号), scholarship(奖学金), language(语言能力), activities(校园活动)
// icon 可选值: fas fa-medal, fas fa-trophy, fas fa-star（不填默认 fa-medal）
//
// 转义字符说明：
// \u201C → "（左双引号）  \u201D → "（右双引号）  \u2014 → —（破折号）  \u00B7 → ·（间隔号）

var honorsData = [
    // ===== 专业竞赛 =====
    { title: '全球校园人工智能算法精英大赛（算法挑战赛）', desc: '作品《公共巴士辅助无线充电的电动汽车调度》，国家级一等奖（全国第一名）', date: '2024.11', category: 'ai', image: 'images/挑战国.jpg' },
    { title: '全球校园人工智能算法精英大赛（算法应用赛）', desc: '作品《无人车视觉巡航》，国家级一等奖', date: '2024.12', category: 'ai', image: 'images/应用国.jpg' },
    { title: '全球校园人工智能算法精英大赛（算法创新赛）', desc: '作品《\u201C翼\u201D览无余\u2014\u2014风电机组故障智能检测系统》，国家级一等奖', date: '2025.12', category: 'ai', image: 'images/创新国.jpg' },
    { title: '全球校园人工智能算法精英大赛（算法挑战赛）', desc: '作品《公共巴士辅助无线充电的电动汽车调度》，省级一等奖', date: '2024.11', category: 'ai', image: 'images/挑战省.jpg' },
    { title: '全球校园人工智能算法精英大赛（算法应用赛）', desc: '作品《无人车视觉巡航》，省级一等奖', date: '2024.11', category: 'ai', image: 'images/应用省.jpg' },
    { title: '全球校园人工智能算法精英大赛（算法创新赛）', desc: '作品《\u201C翼\u201D览无余\u2014\u2014风电机组故障智能检测系统》，省级二等奖', date: '2025.11', category: 'ai', image: 'images/创新省.jpg' },
    { title: '河北省大学生创新大赛', desc: '作品《\u201C翼\u201D览无余\u2014\u2014风电叶片智能检测系统领跑者》，省级一等奖', date: '2025.12', category: 'ai', image: 'images/国创省.jpg' },
    { title: '中国大学生计算机设计大赛', desc: '作品《锐视\u00B7智能视觉工程》，省级二等奖', date: '2024.06', category: 'ai', image: 'images/鸡舍.jpg' },
    { title: '中国机器人及人工智能大赛', desc: '作品《仿生机器人单人舞》，省级三等奖', date: '2026.01', category: 'ai', image: 'images/单人舞蹈.jpg' },
    { title: '中国机器人及人工智能大赛', desc: '作品《仿生机器人多人舞》，省级优秀奖', date: '2026.01', category: 'ai', image: 'images/多人舞蹈.jpg' },
    { title: '\u201C华青杯\u201D全国大学生人工智能大赛', desc: '二等奖', date: '2024.09', category: 'ai', image: 'images/华青杯.jpg' },
    { title: '工业强国建设素质提升\u201C尚工\u201D行动岗位能力适应评测', desc: '大数据应用工程师', date: '2024.11', category: 'ai', image: 'images/大数据应用.jpg' },
    { title: '全国计算机等级考试三级', desc: '网络技术', date: '2024.03', category: 'ai', image: 'images/ncre.png' },

    // ===== 数学建模 =====
    { title: '国际大学生数学建模竞赛', desc: '作品《Submerged Symphony: Optimizing Rescues for Submersible with Predictive Models》，Honorable Mention奖（国家级二等奖）', date: '2024.04', category: 'math', image: 'images/数学建模H奖.jpg' },
    { title: 'MathorCup数学应用挑战赛', desc: '作品《基于yolov5的甲骨文目标检测和识别分类》，赛区三等奖', date: '2024.04', category: 'math', image: 'images/mmb.jpg' },

    // ===== 荣誉称号 =====
    { title: '河北省省级三好学生', desc: '2024-2025学年', date: '2025.04', category: 'awards', icon: 'fas fa-trophy', image: 'images/省三好.jpg' },
    { title: '校级十佳本科生', desc: '2024年度', date: '2025.05', category: 'awards', icon: 'fas fa-trophy', image: 'images/十佳.jpg' },
    { title: '校级优秀团干部标兵', desc: '2024年度', date: '2025.05', category: 'awards', icon: 'fas fa-trophy', image: 'images/优干标兵.jpg' },
    { title: '校级三好学生标兵', desc: '2023-2024学年', date: '2024.11', category: 'awards', icon: 'fas fa-trophy', image: 'images/校三好标兵.jpg' },
    { title: '校级优秀团员标兵', desc: '2023年度', date: '2024.05', category: 'awards', icon: 'fas fa-trophy', image: 'images/优团标兵.jpg' },
    { title: '校级优秀学生干部', desc: '2024-2025学年', date: '2025.11', category: 'awards', icon: 'fas fa-trophy', image: 'images/优秀干部.jpg' },
    { title: '校级三好学生', desc: '2022-2023学年', date: '2023.11', category: 'awards', icon: 'fas fa-trophy', image: 'images/校三好.jpg' },
    { title: '校级优秀团员', desc: '2022年度', date: '2023.05', category: 'awards', icon: 'fas fa-trophy', image: 'images/优团.jpg' },
    { title: '第十七届学生校长助理', desc: '2024年度', date: '2024.01', category: 'awards', icon: 'fas fa-trophy', image: 'images/校长助理.jpg' },
    { title: '计工学院优秀共产党员', desc: '2025年度', date: '2025.12', category: 'awards', icon: 'fas fa-trophy', image: 'images/优秀共产党员.jpg' },
    { title: '计工学院青年学习标兵', desc: '2024-2025学年', date: '2025.11', category: 'awards', icon: 'fas fa-trophy', image: 'images/青年学习标兵.jpg' },
    { title: '计工学院青年科创标兵', desc: '2024-2025学年', date: '2025.11', category: 'awards', icon: 'fas fa-trophy', image: 'images/青年科创标兵.jpg' },
    { title: '计工学院学习之星', desc: '学习强国积分争霸赛', date: '2023.12', category: 'awards', icon: 'fas fa-trophy', image: 'images/学习之星.jpg' },
    { title: '计算机类学习标兵', desc: '第一学期', date: '2023.03', category: 'awards', icon: 'fas fa-trophy', image: 'images/学习标兵1.jpg' },
    { title: '计科专业学习标兵', desc: '第三学期', date: '2024.03', category: 'awards', icon: 'fas fa-trophy', image: 'images/学习标兵3.jpg' },
    { title: '计科专业学习标兵', desc: '第四学期', date: '2024.10', category: 'awards', icon: 'fas fa-trophy', image: 'images/学习标兵4.jpg' },
    { title: '计科专业学习标兵', desc: '第五学期', date: '2025.03', category: 'awards', icon: 'fas fa-trophy', image: 'images/学习标兵5.jpg' },

    // ===== 奖学金 =====
    { title: '国家奖学金', desc: '2024-2025学年', date: '2025.12', category: 'scholarship', icon: 'fas fa-trophy', image: 'images/果酱2.jpg' },
    { title: '国家奖学金', desc: '2023-2024学年', date: '2024.12', category: 'scholarship', icon: 'fas fa-trophy', image: 'images/果酱.jpg' },
    { title: '东北大学文浩二等奖学金', desc: '2024-2025学年', date: '2026.01', category: 'scholarship', icon: 'fas fa-trophy', image: 'images/文浩.jpg' },
    { title: '校综合一等奖学金', desc: '2023-2024学年第一学期', date: '2024.04', category: 'scholarship', icon: 'fas fa-trophy', image: 'images/1等奖学金.jpg' },
    { title: '校综合二等奖学金', desc: '2022-2023学年第一学期', date: '2023.05', category: 'scholarship', icon: 'fas fa-trophy', image: 'images/2等奖学金.jpg' },
    { title: '校综合三等奖学金', desc: '2022-2023学年第二学期', date: '2023.10', category: 'scholarship', icon: 'fas fa-trophy', image: 'images/3等奖学金.jpg' },
    { title: '英语四级单项奖学金', desc: '2022-2023学年', date: '2023.11', category: 'scholarship', icon: 'fas fa-trophy', image: 'images/4级奖学金.jpg' },
    { title: '创新创业奖学金', desc: '2024年度', date: '2025.05', category: 'scholarship', icon: 'fas fa-trophy', image: 'images/科创奖学金.jpg' },

    // ===== 语言能力 =====
    { title: '全国大学生英语竞赛（NECCS）', desc: '国家级特等奖', date: '2024.05', category: 'language', icon: 'fas fa-star', image: 'images/大英.jpg' },
    { title: '全国大学英语六级考试', desc: '615分，口语优秀', date: '2023.06', category: 'language', icon: 'fas fa-star', image: 'images/六级.jpg' },
    { title: '全国大学英语四级考试', desc: '657分，口语B+', date: '2023.03', category: 'language', icon: 'fas fa-star', image: 'images/四级.jpg' },
    { title: '\u201C外教社\u00B7词达人杯\u201D全国大学生英语词汇能力大赛', desc: '校赛一等奖（全校第一名）', date: '2023.06', category: 'language', icon: 'fas fa-star', image: 'images/cdr.jpg' },
    { title: '普通话水平测试', desc: '91.4分，二级甲等', date: '2023.07', category: 'language', icon: 'fas fa-star', image: 'images/普通话.jpg' },

    // ===== 校园活动 =====
    { title: '唐讯信息第195期实习实训', desc: '作品《多模态内容生成与分析系统》，优秀实习组组长', date: '2025.09', category: 'activities', icon: 'fas fa-star', image: 'images/tx.jpg' },
    { title: '\u201C返家乡\u201D招生宣讲（社会实践优秀个人）', desc: '宝坻四中学生成长导师', date: '2025.12', category: 'activities', icon: 'fas fa-star', image: 'images/四中.jpg' },
    { title: '北京华清远见第33届全国高校人工智能高级师资培训', desc: '具身智能机器人方向', date: '2026.01', category: 'activities', icon: 'fas fa-star', image: 'images/hqyj2.png' },
    { title: '北京华清远见第33届全国高校嵌入式系统高级师资培训', desc: '嵌入式Linux方向', date: '2026.01', category: 'activities', icon: 'fas fa-star', image: 'images/hqyj1.png' },
    { title: '全国大学生职业规划大赛', desc: '校级三等奖', date: '2024.12', category: 'activities', icon: 'fas fa-star', image: 'images/职规.jpg' },
    { title: '\u201C东秦廉韵\u201D廉洁文化作品大赛', desc: '校级三等奖', date: '2024.09', category: 'activities', icon: 'fas fa-star', image: 'images/廉洁.jpg' },
    { title: '\u201C学廉知纪\u00B7崇洁尚廉\u201D知识竞赛', desc: '院级一等奖', date: '2025.11', category: 'activities', icon: 'fas fa-star', image: 'images/廉洁2.jpg' },
    { title: '\u201C一二\u00B7九\u201D运动主题征文活动', desc: '院级三等奖', date: '2023.12', category: 'activities', icon: 'fas fa-star', image: 'images/129.jpg' },
    { title: '雷锋月主题征文活动', desc: '院级三等奖', date: '2023.04', category: 'activities', icon: 'fas fa-star', image: 'images/雷锋月.jpg' }
];