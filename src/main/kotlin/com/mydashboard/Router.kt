package com.mydashboard

import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class Router {

    @CrossOrigin(origins = ["http://localhost:8383"])
    @GetMapping("/api/getallmoduleslist")
    fun getAllmodulesList() = ApiResponse(responseSuccess, listOf("vasttrafik Module", "trying list to see what will happened"))

    @CrossOrigin(origins = ["*"])
    @GetMapping("/api/getallmodules")
    fun getAllmodules() = ApiResponse( responseSuccess,  "vasttrafik Module")
}


data class ApiResponse<out T>(val code: Int, val data: T)

const val responseSuccess:Int = 1
const val responseFailed:Int  = 0
const val responseException:Int = -1
