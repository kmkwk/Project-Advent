import { useRouter } from "next/router";
import { SetStateAction, useEffect, useState } from "react";
import { Button, Grid, Image } from "semantic-ui-react";
import notify from "../../../../src/component/notify/notify";
import ImageList from "../../../../src/component/write/wrap/imagelist";
import UnsplashSearch from "../../../../src/component/write/wrap/unsplashsearch";
import allAxios from "../../../../src/lib/allAxios";
import userAxios from "../../../../src/lib/userAxios";
import styles from "../../../../styles/write/wrap.module.css"

export default function Wrap(){

    const router = useRouter()
    const wrapId = router.query.wrapid
    const adventId: string | string[] | undefined = router.query.id

    const { Row, Column } = Grid

    const [backgroundImage, setBackgroundImage]: any = useState('')
    const [imageType, setImageType] = useState(1)
    const [fileImage, setFileImage]: any = useState()
    const [userInfo, setUserInfo]: any = useState()

    const deleteImage = () => {
        setBackgroundImage('')
        setFileImage()
    }

    // 배경종류선택 
    const selectImageType = (num: SetStateAction<number>) => {
        setImageType(num)
    }

    // 배경 이미지 업로드
    const saveImage = (e:any) => {
        if(e.target.files.length !== 0){
        setBackgroundImage(URL.createObjectURL(e.target.files[0]))};
        setFileImage(e.target.files[0])
    };

    const deleteBackgroundImageupload = () => {
        URL.revokeObjectURL(backgroundImage);
        setBackgroundImage('');
        setFileImage()
    }

    const writeWrap = () => {
        imageToServer()
    }

    const closeWrap = () => {
        router.push({ pathname: `/write/${adventId}`})
    }

    const getUserInfo = async () => {
        await userAxios
            .get(`/auth/users`)
            .then(({ data }) => {
                setUserInfo(data.body.user)
            })
            .catch((e) => {
                console.log(e)
            });
        };

    const imageToServer = async () => {
        const body = new FormData();
        const adventBoxWrapperRequest: any = {
            advent_day: wrapId,
            advent_id: adventId,
            image: backgroundImage,
            user_id: userInfo.id
        }
        const newBlob: any = new Blob([new Uint8Array(backgroundImage)]);
        const files = new File([newBlob], backgroundImage, {type: "image/jpeg"})
        body.append("adventBoxWrapperRequest", new Blob([JSON.stringify(adventBoxWrapperRequest)],{type: "application/json"}))
        if (fileImage) {
            body.append("file", fileImage)
        } else {
            body.append("file", files)
        }
        
        await allAxios
            .post(`/boxes/wrappers`, body, {
                headers: {"Content-Type": "multipart/form-data"}
            })
            .then(() => {
                notify('success', `👋${wrapId}번 포장지가 변경되었습니다.`)
                router.push({ pathname: `/write/${adventId}`})
            })
            .catch((e) => {
                console.log(e)
            })
    }

    const getAdventInfo = async (adventId: string | string[] | undefined, userInfo: any) => {
        await allAxios
            .get(`/advents/${adventId}/${userInfo.id}/advent`)
            .then(({ data }) => {
                data.advent_box_list.map((box: any) => {
                    if (box.advent_day == wrapId) {
                        setBackgroundImage(box.wrapper)
                    }
                })
            })
            .catch((e) => {
                console.log(e)
            })
    }

    useEffect(() => {
        getUserInfo()
    }, [])

    useEffect(() => {
        if (userInfo && adventId){
            getAdventInfo(adventId, userInfo)
        }
    }, [userInfo, adventId])

    return(
        <>
            <Grid centered stackable>
                <Row>
                    <Column textAlign="center" className={styles.selectimage}>
                        <div className={styles.selecttitle}>내가 선택한 배경</div>
                    </Column>
                </Row>

                <Row>
                    <Column width={3}/>
                    <Column textAlign="center" width={10}>
                        <Image src={backgroundImage} alt="" wrapped onClick={deleteImage} size="small" />
                    </Column>
                    <Column width={2} textAlign="center">
                        <Button color="blue" inverted className={ styles.button } onClick={()=>{ writeWrap()}}>저장</Button>
                        <br /><br />
                        <Button inverted className={ styles.button } onClick={()=>{ closeWrap()}}>취소</Button>
                    </Column>
                    <Column width={1}/>
                </Row>
            
                <Row>
                    <Column>
                        <div className={styles.imagetitle}>
                            <div onClick={()=>{selectImageType(1)}} className={imageType===1?styles.selecttab:styles.tabhead }>내 이미지 찾기</div>
                            <div onClick={()=>{selectImageType(2)}} className={imageType===2?styles.selecttab:styles.tabhead }>기본 이미지 선택</div>
                            <div onClick={()=>{selectImageType(3)}} className={imageType===3?styles.selecttab:styles.tabhead }>이미지 검색</div>
                        </div>
                    </Column>
                </Row>

                <Row>
                    <Column textAlign="center" width={8}>
                        {imageType===1?
                            <div>
                                <div className={styles.imageupload}>
                                    <label className={styles.filebutton} htmlFor="background">이미지 업로드</label>
                                    <input
                                        id="background"
                                        type="file"
                                        accept="image/gif, image/jpeg, image/png"
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
                            <ImageList setBackgroundImage={setBackgroundImage} setFileImage={setFileImage}/>
                        :
                        ''}

                        {imageType===3?
                            <UnsplashSearch setBackgroundImage={setBackgroundImage} setFileImage={setFileImage}/>
                        :
                        ''}

                    </Column>
                </Row>
            </Grid>
        </>
    );
}