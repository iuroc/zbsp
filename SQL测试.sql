SELECT `学号`,
    `姓名`,
    `出生日期`
FROM `student_info`;
SELECT `姓名`,
    `家庭住址`
FROM `student_info`
WHERE `学号` = '0002';
SELECT `姓名`,
    `出生日期`
FROM `student_info`
WHERE YEAR(`出生日期`) > 1995
    AND `性别` = '女';
SELECT `学号`,
    `课程编号`,
    `分数`
FROM `grade`
WHERE `分数` >= 70
    AND `分数` <= 80;
SELECT AVG(`分数`)
FROM `grade`
WHERE `课程编号` = '0002';
SELECT (
        SELECT COUNT(*)
        FROM `grade`
        WHERE `课程编号` = '0003'
    ) AS `报了该课程`,
    (
        SELECT COUNT(*)
        FROM `grade`
        WHERE `课程编号` = '0003'
            AND `分数` > 0
    ) AS `该课有成绩`;
SELECT `姓名`,
    `出生日期`
FROM `student_info`
ORDER BY `出生日期` DESC;
SELECT `学号`,
    `姓名`
FROM `student_info`
WHERE SUBSTRING(`姓名`, 1, 1) = '张';
SELECT `学号`,
    `姓名`,
    `性别`,
    `出生日期`,
    `家庭住址`
FROM `student_info`
ORDER BY `性别`,
    `学号` DESC;
SELECT `学号`,
    AVG(`分数`) AS `平均分`
FROM `grade`
GROUP BY `学号`;
SELECT `学号`,
    `姓名`
FROM `student_info`
WHERE SUBSTRING(`姓名`, 1, 1) = '刘'
UNION ALL
SELECT `学号`,
    `姓名`
FROM `student_info`
WHERE SUBSTRING(`姓名`, 1, 1) = '张';
SELECT `姓名`,
    `出生日期`
FROM `student_info`
WHERE `性别` = (
        SELECT `性别`
        FROM `student_info`
        WHERE `姓名` = '刘东阳'
    );
SELECT `学号`,
    `姓名`,
    `性别`
FROM `student_info`
WHERE `学号` IN (
        SELECT `学号`
        FROM `grade`
        WHERE `课程编号` IN ('0002', '0005')
    );
SELECT AVG(`分数`)
FROM `grade`
WHERE `学号` = '0002';
-- 方法一
SELECT `课程编号`,
    `分数`
FROM `grade`
WHERE `分数` > ANY(
        SELECT `分数`
        FROM `grade`
        WHERE `学号` = '0002'
    )
    AND `学号` = '0001';
-- 方法二
SELECT `课程编号`,
    `分数`
FROM `grade`
WHERE `学号` = '0001'
    AND `分数` > (
        SELECT MIN(`分数`)
        FROM `grade`
        WHERE `学号` = '0002'
    );
SELECT `课程编号`,
    `分数`
FROM `grade`
WHERE `学号` = '0001'
    AND `分数` > ALL(
        SELECT `分数`
        FROM `grade`
        WHERE `学号` = '0002'
    );
SELECT `学号`,
    `分数`
FROM `grade`
WHERE `分数` <= 90
    AND `分数` >= 80;
SELECT `姓名`
FROM `student_info`
WHERE `学号` IN (
        SELECT `学号`
        FROM `grade`
        WHERE `分数` <= 90
            AND `分数` >= 80
    );
SELECT `学号`,
    `分数`
FROM `grade`
WHERE `分数` <= 90
    AND `分数` >= 80;
SELECT B.`学号`,
    B.`分数`,
    A.`姓名`
FROM student_info A,
    grade B
WHERE B.`分数` <= 90
    AND B.`分数` <= 80
    AND A.`学号` = B.`学号`;
SELECT A.`学号`,
    A.`姓名`,
    B.`分数`
FROM student_info A
    INNER JOIN grade B ON A.`学号` = B.`学号`
WHERE `课程编号` = '0003';
SELECT A.`学号`,
    A.`姓名`,
    MAX(B.`分数`) AS `最高分数`
FROM student_info A,
    grade B
WHERE A.`学号` = B.`学号` GROUP BY A.`学号`;