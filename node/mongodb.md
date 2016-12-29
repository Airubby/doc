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