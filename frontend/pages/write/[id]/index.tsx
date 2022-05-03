import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DayOne from "../../../src/component/write/dayone";
import DaySeven from "../../../src/component/write/dayseven";
import DayThree from "../../../src/component/write/daythree";
import allAxios from "../../../src/lib/allAxios";
import userAxios from "../../../src/lib/userAxios";

export default function WritePresent(){

    const router = useRouter()
    const adventId = router.query.id
    const [userInfo, setUserInfo]: any = useState()
    const [adventDay, setAdventDay] = useState(1)

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

    const getDay = async () => {
        await allAxios
            .get(`/advents/${adventId}/days`, {
                params: {
                    adventId: adventId
                }
            })
            .then(({ data }) => {
                setAdventDay(data.day)
            })
            .catch((e) => {
                console.log(e)
            })
    }

    useEffect(() => {
        getUserInfo()
    }, [])

    useEffect(() => {
        if (adventId) {
            getDay()
        }
    }, [adventId])

    return(
        <div data-aos="zoom-in" data-aos-duration="2000">
            <Head>
                <title>선물 작성하기 | Make Our Special</title>
            </Head>
            {adventDay===1?
            <DayOne userInfo={userInfo} />
            :''}
            {adventDay===3?
            <DayThree userInfo={userInfo} />
            :''}
            {adventDay===7?
            <DaySeven userInfo={userInfo} />
            :''}
        </div>
    );
}