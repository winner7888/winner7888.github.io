// 课程数据 - 添加新课程只需在下面数组中添加一条记录
// 格式: { name: '课程名', grade: 分数 }

var coursesData = [
    { name: '高等数学', grade: 100 },
    { name: '编译原理', grade: 100 },
    { name: '人工智能导论', grade: 100 },
    { name: '离散数学', grade: 100 },
    { name: '计算机接口技术', grade: 100 },
    { name: '概率论与数理统计', grade: 100 },
    { name: '工程实训', grade: 100 },
    { name: '计算机组成原理', grade: 99 },
    { name: 'C++程序设计', grade: 99 },
    { name: '信息安全基础', grade: 99 },
    { name: '嵌入式系统及应用', grade: 99 },
    { name: '计算机导论', grade: 99 },
    { name: '汇编语言程序设计', grade: 98 },
    { name: '数据库原理', grade: 98 },
    { name: 'Web开发与应用', grade: 98 },
    { name: '软件工程', grade: 98 },
    { name: '英语阅读与写作', grade: 98 },
    { name: '数据结构', grade: 97 },
    { name: '操作系统', grade: 97 },
    { name: '电路原理', grade: 97 },
    { name: '计算机体系结构', grade: 97 },
    { name: 'Java程序设计', grade: 97 },
    { name: '电子技术基础', grade: 96 },
    { name: '算法设计与分析', grade: 96 }
];

// 渲染课程
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
}