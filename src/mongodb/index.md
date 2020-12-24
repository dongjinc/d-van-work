## Linux服务器
1.mongodb
- 连接数据库 (mongo、 mongo -uroot -pxxx)
- 选择某个数据库，修改指定用户密码 db.updateUser('root', {pwd: '123456'})
- 查询当前库下的账户 show users、db.getUsers()
- 删除用户 db.dropUser('xx')
- service mongod start 
- netstat -lanp | grep "27017"
- 注意事项 
#
authentication failed（node连接数据库时报的错）

    对于项目或第三方工具才能使用用户名和密码连接 mongodb指定的数据库
    use mydb
    #3切换至业务库 在该库创建访问该库的用户
    db.createUser(
    #4 创建用户
        {
        user: "mydbDBA",
        pwd: "123321",
        roles: [ {role:"dbOwner", db:"mydb"} ]
        }
    )
 # 
 Error: not authorized on blog to execute command
 是因为当前用户没有写入数据库的权限
db.updateUser('dongjincheng', {roles: [{"role": "readWrite", "db": "blog"},{"role": "dbAdmin", "db": "blog"}]})
 #
 Error: couldn’t add user: No role named userAdminAnyDatabase@

    数据库用户角色：read、readWrite;
    数据库管理角色：dbAdmin、dbOwner、userAdmin；
    集群管理角色：clusterAdmin、clusterManager、clusterMonitor、hostManager；备份恢复角色：backup、restore；
    所有数据库角色：readAnyDatabase、readWriteAnyDatabase、userAdminAnyDatabase、dbAdminAnyDatabase
    超级用户角色：root；这里还有几个角色间接或直接提供了系统超级用户的访问（dbOwner 、userAdmin、userAdminAnyDatabase）
    内部角色：__system


2.防火墙
- systemctl status firewalld 查看防火墙状态
- systemctl start firewalld、systemctl stop firewalld 开启、关闭防火墙
- iptables -I INPUT -p tcp --dport 27017 -j ACCEPT 开放指定端口。如果关闭过防火墙，重启时，需要重新指定开放端口

3.查看网络(端口)
- netstat -lanp | grep "27017"

4.pm2 deploy
- 依靠ecosystem.config.js，deploy配置，与github相关远程库进行拉取代码进行部署。
- 命令：pm2 deploy production setup(需要先初始化服务器应用)、pm2 deploy production(部署)

5.常用命令：
- 重命名 rename [匹配要替换的名字] [将要改成的名字] [当前文件名]、mv
- 查看端口占用情况： lsof -i:端口号、netstat -tunlp 用于显示tcp、udp的端口号和进程等相关情况
- 杀掉指定进程命令 kill -9 PID

区分 systemctl和service
[参考博客](https://cshihong.github.io/2018/10/15/Linux%E4%B8%8Bsystemctl%E5%91%BD%E4%BB%A4%E5%92%8Cservice%E3%80%81chkconfig%E5%91%BD%E4%BB%A4%E7%9A%84%E5%8C%BA%E5%88%AB/)
systemctl 是一个systemd工具，主要负责控制systemd系统和服务管理器
systemd是一个系统管理守护进程、工具和库的集合，用于取代System V初始进程。其功能集中管理和配置类UNIX系统

service 可以启动、停止、重新启动和关闭系统服务，可以显示所有系统服务的当前状态
service 命令的作用失去/etc/init.d目录下寻找相关的服务，进行开启和关闭等操作



