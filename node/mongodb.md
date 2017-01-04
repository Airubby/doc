1.下载mongodb并按照
2.添加到环境变量  MONGODB  = >  D:\mongodb\bin
                将 %MONGODB% 添加到PATH中
3.创建数据库存放地址：E:\mongodb\db          所有数据库都存放到这个文件夹下面
                    mongod --storageEngine mmapv1 --dbpath E:\mongodb\db      //更换存储引擎，不然用mongoVUE看不见Collections中的东西
                    mongod --dbpath E:\mongodb\db       //后面启动数据库就可以这样启动就行了
4.另开cmd：输入mongo  进入shell
            输入db  查看当前操作的数据库

5.创建数据库mydb：use mydb
show dbs  查看所有数据库，新建的数据库要插入一条数据才能查看到   db.mydb.insert({"name":"稻草"}) 



db.student.insert({"name":"稻草"});    插入数据，随着数据的插入，数据库创建成功了，集合也创建成功了
mongoimport --db test --collection restaurants --drop --file primer-dataset.json
--db test  想往哪个数据库里面导入
--collection restaurants  想往哪个集合中导入
--drop 把集合清空
--file primer-dataset.json  哪个文件

db.student.find({"score.shuxue":70});
db.student.find({"score.shuxue":70 , "age":12})
db.student.find({"score.yuwen":{$gt:50}});    大于条件
db.student.find({$or:[{"age":9},{"age":11}]});  寻找所有年龄是9岁，或者11岁的学生
db.restaurants.find().sort( { "borough": 1, "address.zipcode": 1 } )  找完毕之后，打点调用sort，表示升降排序
db.student.update({"name":"小明"},{$set:{"age":16}});  查找名字叫做小明的，把年龄更改为16岁
db.student.update({"score.shuxue":70},{$set:{"age":33}});  找数学成绩是70，把年龄更改为33岁

nodejs操作 mongodb   需引入包  npm install mongodb

