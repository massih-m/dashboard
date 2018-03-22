package com.mydashboard

import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class Router {

    @CrossOrigin(origins = ["*"])
    @GetMapping("/api/getallmoduleslist")
    fun getAllmodulesList() = ApiResponse(responseSuccess,
            listOf(
                    hashMapOf(
                            "name" to "Vasttrafik",
                            "inputs" to listOf(
                                    hashMapOf("input_name" to "destination stop", "input_type" to " blabla")
                            )
                    ),
                    hashMapOf("name" to "Weather", "inputs" to "town name")
            )
    )

    @CrossOrigin(origins = ["*"])
    @GetMapping("/api/getallmodules")
    fun getAllmodules() = ApiResponse( responseSuccess,  "vasttrafik Module")
}


data class ApiResponse<out T>(val code: Int, val data: T)

const val responseSuccess:Int = 1
const val responseFailed:Int  = 0
const val responseException:Int = -1
