(function(Vue) {
    new Vue({
        el: "#todoapp",
        data: {
            // todos: [{
            //         id: 1,
            //         title: "吃饭",
            //         done: true
            //     },
            //     {
            //         id: 2,
            //         title: "睡觉",
            //         done: false
            //     },
            //     {
            //         id: 3,
            //         title: "工作",
            //         done: true
            //     }
            // ],
            dataStatus: [
                'All',
                'Active',
                'Completed'
            ],
            dataStatusIndex: 0,
            allShow: true,
            whichShow: true,
            todos: JSON.parse(window.localStorage.getItem("todolist") || '[]')
        },
        // watch监视可以监视data中的数据成员，当data数据成员发生改变时，会自动执行该方法
        watch: {
            // 深度监视 当todos改变时会自动调用handler
            todos: {
                handler() {
                    window.localStorage.setItem("todolist", JSON.stringify(this.todos));
                },
                deep: true
            }
        },
        methods: {
            /*添加任务项*/
            handleAddToDo: function(e) {
                const lastTodo = this.todos[this.todos.length - 1];
                const id = lastTodo ? lastTodo.id + 1 : 1;
                if (e.target.value.trim().length !== 0) {
                    this.todos.push({
                        id: id,
                        title: e.target.value,
                        done: false,
                        isEditing: false
                    })
                }
                // 清空文本框
                e.target.value = "";
            },
            /*删除单个任务*/
            handleRemoveTodo: function(index) {
                this.todos.splice(index, 1);
            },
            /*切换所有任务的完成状态*/
            handleToggleAll: function(e) {
                console.log(this); // Vue实例
                const checked = e.target.checked;
                this.todos.forEach(
                    (item) => {
                        item.done = checked;
                    }
                );
            },
            // 设置任务中有一个没选中，全选状态则需要改变
            getToggleAllStatus: function() {
                let status = true; // 默认为true
                this.todos.forEach(item => {
                    if (item.done === false) {
                        status = false;
                    }
                });
                return status;
            },
            // 删除所有已完成的任务
            clearCompleted() {
                for (let i = 0; i < this.todos.length; i++) {
                    const item = this.todos[i]
                    if (item.done == true) {
                        this.todos.splice(i, 1);
                        i--;
                    }
                }
            },
            // 三种状态筛选
            switchStatus(index) {
                this.dataStatusIndex = index;
                if (this.dataStatus[index] == "All") {
                    this.allShow = true;
                } else if (this.dataStatus[index] == "Active") {
                    this.allShow = false;
                    this.whichShow = false;
                } else if (this.dataStatus[index] == "Completed") {
                    this.allShow = false;
                    this.whichShow = true;
                }
            },
            // 设置可编辑状态
            toEdit(obj) {

                obj.isEditing = true
            },
            // 设置不可编辑状态
            unEdit(obj) {

                obj.isEditing = false;

            },
        },
        computed: {
            // 获取get所有未完成的任务的个数,method当数据发生改变时就用调用
            getRemaining() {
                let count = 0;
                this.todos.forEach((item, index) => {
                    if (item.done == false) {
                        count++
                    }
                })
                return count
            }
        },
        // 自定义focus指令
        directives: {
            "todo-focus": function(el, title) {
                if (title.value) {
                    el.focus()
                }
            }
        }
    });
})(Vue);