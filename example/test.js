
var event = {
    clientList: {},
    listen: function(key, fn) {
        if(!this.clientList[key]) {
            this.clientList[key] = []
        }
        this.clientList[key].push(fn)
    },
    trigger: function() {
        let key = Array.prototype.shift.call(arguments)
            fns = this.clientList[key]
        
        if (!fns || fns.length === 0) {
            return false
        }

        for(let i=0; i<fns.length; i++) {
            fns[i].apply(this, arguments)
        }
    },
    remove: function(key, fn) {
        let fns = this.clientList[key]
        if (fns.length === 0) {
            return false
        }
        if (!fn) {
            fns && (fns.length = 0)
        } else {
            for (let i= fns.length - 1; i>=0; i--) {
                if(fns[i] === fn) {
                    fns.splice(i, 1)
                }
            }
        }
    }
}

var installEvent = function(obj) {
    for(let key in event) {
        obj[key] = event[key]
    }
}

var newsManager = {}
installEvent(newsManager)

newsManager.listen('sports', fn1 = function(content) {
    console.log('sports', content)
})
newsManager.listen('finance', fn2 = function(content) {
    console.log('finance', content)
})

newsManager.remove('finance', fn2)

newsManager.trigger('finance', '这是一条财经消息') // 发布一则“财经消息”
newsManager.trigger('finance', '这是一条财经消息') // 发布一则“财经消息”
newsManager.trigger('sports', '这是一条体育消息') // 发布一则“体育消息”
