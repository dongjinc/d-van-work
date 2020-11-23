## Linux服务器
1.mongodb
- 连接数据库 (mongo、 mongo -uroot -pxxx)
- 修改指定用户密码 db.updateUser('root', {pwd: '123456'})
- service mongod start 
- netstat -lanp | grep "27017"

2.防火墙
- systemctl status firewalld 查看防火墙状态
- systemctl start firewalld、systemctl stop firewalld 开启、关闭防火墙
- iptables -I INPUT -p tcp --dport 27017 -j ACCEPT 开放指定端口。如果关闭过防火墙，重启时，需要重新指定开放端口

3.查看网络(端口)
- netstat -lanp | grep "27017"


区分 systemctl和service
[参考博客](https://cshihong.github.io/2018/10/15/Linux%E4%B8%8Bsystemctl%E5%91%BD%E4%BB%A4%E5%92%8Cservice%E3%80%81chkconfig%E5%91%BD%E4%BB%A4%E7%9A%84%E5%8C%BA%E5%88%AB/)
systemctl 是一个systemd工具，主要负责控制systemd系统和服务管理器
systemd是一个系统管理守护进程、工具和库的集合，用于取代System V初始进程。其功能集中管理和配置类UNIX系统

service 可以启动、停止、重新启动和关闭系统服务，可以显示所有系统服务的当前状态
service 命令的作用失去/etc/init.d目录下寻找相关的服务，进行开启和关闭等操作



