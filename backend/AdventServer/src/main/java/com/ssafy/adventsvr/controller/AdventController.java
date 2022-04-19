package com.ssafy.adventsvr.controller;

import com.ssafy.adventsvr.payload.request.AdventDayRequest;
import com.ssafy.adventsvr.payload.request.AdventPrivateRequest;
import com.ssafy.adventsvr.payload.response.AdventDayResponse;
import com.ssafy.adventsvr.service.AdventService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/advents")
public class AdventController {

    private final AdventService adventService;

    @ApiOperation(value = "1,3,7 선물 생성", notes = "선물 생성")
    @PostMapping
    public ResponseEntity<AdventDayResponse> adventDayInput(@RequestBody @Valid AdventDayRequest adventDayRequest){
        log.info("adventInput");

        if(ObjectUtils.isEmpty(adventDayRequest)){
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(adventService.inputDayAdvent(adventDayRequest));
    }

    @ApiOperation(value = "password 및 기간 설정", notes = "패스워드, 힌트, 기간 설정")
    @PutMapping
    public ResponseEntity<Object> adventPrivateInfoModify(@RequestBody @Valid AdventPrivateRequest adventPrivateRequest) {
        log.info("adventPrivateInfoModify");

        if(!adventPrivateRequest.getPasswordVal().equals(adventPrivateRequest.getPassword())){
            return ResponseEntity.badRequest().build();
        }

        if (ObjectUtils.isEmpty(adventPrivateRequest)) {
            return ResponseEntity.notFound().build();
        }

        adventService.modifyPrivateInfoAdvent(adventPrivateRequest);
        return ResponseEntity.noContent().build();
    }
}