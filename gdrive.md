# How to: Shell interaction with Team's Google Drive
Since the team operates with google drive, this markdown illustrates how to integrate 
the google drive into the workflow with the github repo.


## Install rclone
rclone is a command line package to interact with various cloud services. Follow
[rclone.org/install](https://rclone.org/install/) for installation instructions.

### Get started
Verify it is working via
```shell
rclone ls remote:
```
where 'remote' is the name of the created remote in 'rclone config'. The command lists the google drive files of your linked 
google drive account. <br>
Make sure to rename the folder name of the team's google drive from 'Huawei Tech Challenge' to 'tc' or anything without spaces. This won't change anything 
on the team's google drive, it is rather for convenience reasons when working with `rclone`. <br>
```shell
mkdir gdrive
```
Use the `gdrive` folder if you want to have the google drive files in the git repo folder.

## Usage

### Live synchronization
Read [mount_tutorial](https://rclone.org/commands/rclone_mount/).
For Linux, workflow can be started with
```shell
rclone mount remote:tc ./gdrive/tc
```
and cancelled with CTRL+C and 
```shell
fusermount -u ./gdrive
```

### Offline synchronization 
Download/sync gdrive via
```shell
rclone sync remote:tc ./gdrive
```
and upload-sync via
```shell
rclone sync ./gdrive remote:tc
```
Make sure to pay attention to commit conflicts when choosing 
offline synchronization.

### More
See [rclone.org/commands](https://rclone.org/commands/) for more.
