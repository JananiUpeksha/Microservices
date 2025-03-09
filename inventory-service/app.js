import express  from "express"
import {Eureka} from "eureka-js-client"

const app = express();
const port = 3000

const router = express.Router()

//8080/inventory-service/inventory

router.get('/inventory',(req,res)=>{
    res.json({
        items:['milk','eggs','bread'],
        message:'welcome'
    })
})

app.use('/inventory-service',router)

const eurekaClient = new Eureka({
    instance: {
        instanceId: "inventory-service",
        app: "INVENTORY-SERVICE",
        hostName: "localhost",
        ipAddr: "127.0.0.1",
        port: {
            $: port,   // Ensure it matches app's running port
            "@enabled": true,
        },
        vipAddress: "inventory-service",
        dataCenterInfo: {
            "@class": "com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo",
            name: "MyOwn",
        },
    },
    eureka: {
        host: "localhost",
        port: 8761,
        servicePath: "/eureka/",
    },
});

app.listen(port, ()=>{
    console.log("inventory service")

    eurekaClient.start((error)=>{
        if(error){
            console.error('fail')
        }else {
            console.log('success')
        }
    })

})
