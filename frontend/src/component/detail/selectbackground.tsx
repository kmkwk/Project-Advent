import { Image } from "semantic-ui-react";
import React from 'react';
import { useRouter } from "next/router";
import { SetStateAction, useEffect, useState } from "react";
import styles from "../../../styles/detail/selectbackground.module.css"



export default function Selectbackground () {
    const router = useRouter();
    const [backgroundImage, setBackgroundImage] = useState('')
    const [imageType, setImageType] = useState(1)

    const selectImage = (e:any) => {
        setBackgroundImage(e.target.currentSrc)
    }

    const deleteImage = (e:any) => {
        setBackgroundImage('')
    }

    // 배경선택 
    const selectImageType = (num: SetStateAction<number>) => {
        setImageType(num)
    }


    // 배경 이미지 업로드
    const saveImage = (e:any) => {
        if(e.target.files.length !== 0){
        setBackgroundImage(URL.createObjectURL(e.target.files[0]))};
    };

    const deleteBackgroundImageupload = () => {
        URL.revokeObjectURL(backgroundImage);
        setBackgroundImage('');
    }



    return (
        <>
            <div>
            <div className={styles.selectimage}>
                <div className={styles.selecttitle}>내가 선택한 배경</div>
                <img src={backgroundImage} onClick={deleteImage}></img>
            </div>
            <div className={styles.imagetitle}>
                <div onClick={()=>{selectImageType(1)}} className={imageType===1?styles.selecttab:styles.tabhead }>이미지 찾기</div>
                <div onClick={()=>{selectImageType(2)}} className={imageType===2?styles.selecttab:styles.tabhead }>기존 이미지 선택</div>
                <div onClick={()=>{selectImageType(3)}} className={imageType===3?styles.selecttab:styles.tabhead }>이미지 검색</div>
            </div>
            {imageType===1?
                <div>
                    <div className={styles.imageupload}>
                    <label className={styles.filebutton} htmlFor="background">이미지 업로드</label>
                    <input
                        id="background"
                        type="file"
                        style={{ display: "none" }}
                        onChange={saveImage}
                    />
                    <button className={styles.deletebutton} onClick={() => deleteBackgroundImageupload()}>
                        삭제
                    </button>
                    </div>
                </div>
            :
            ''}

            {imageType===2?
                    
                    <div>
            <div className={styles.backgroundtitle}>
            # 전통무늬
            </div>
            <div className={styles.backgroundcontent}>
            
            </div>
            <div className={styles.backgroundtitle}>
            # 선물상자
            </div>
            <div className={styles.backgroundcontent}>

            </div>
            <div className={styles.backgroundtitle}>
            # 반복패턴 
            </div>
            <div className={styles.backgroundcontent}>
            <img src='/backgroundsample/background.jpg' onClick={selectImage}></img>
            <img src='/backgroundsample/background1.jpg' onClick={selectImage}></img>
            <img src='/backgroundsample/background2.jpg' onClick={selectImage}></img>
            <img src='/backgroundsample/background3.jpg' onClick={selectImage}></img>
            </div>
            <div className={styles.backgroundtitle}>
            # 색상선택
            </div>
            {/* <div className={styles.color_picker_panel}>
                <div className={styles.panel_row}>
                    <div className={styles.defailt_swatches}></div>
                    <button className={styles.button_eyedropper}>Get Color</button>
                </div>
                <div className={styles.panel_row}>
                    <div className={styles.spectrum_map}>
                        <button id="spectrum_cursor" className={styles.color_cursor}>
                        </button>
                    
                    <canvas id="spectrum_canvas"></canvas>
                    </div>
                    <div className={styles.hue_map}>
                        <button id="hue_cursor" className={styles.color_cursor}></button>
                        <canvas id="hue_canvas"></canvas>
                    </div>
                </div>
                <div className={styles.panel_row}>
                    <div id="rgb_fields" className={styles.field_group}></div>

                </div>
            </div> */}
            </div>
            
        :
        ''}
        {imageType===3?
                <>
                <div>
                    upsplash 이미지 들어올 곳 !!!
                </div>
                </>
        :
        ''}
            </div>
        </>
    );
}