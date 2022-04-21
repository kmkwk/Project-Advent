import { useRouter } from "next/router";
import { Button, Header } from "semantic-ui-react";
import styles from "../../../styles/write/write.module.css"

export default function WriteThree({ num }: any){

    const router = useRouter()
    const id = router.query.id

    const writeDetail = (number: Number) => {
        router.push({ pathname: `/write/${id}/${number}`, query: { day: `${3}`}})
    }
    
    const writeWrap = (number: Number) => {
        router.push({ pathname: `/write/${id}/wrap/${number}`, query: { day: `${3}`} })
    }

    return(
        <>
            <div>
                <Header as="h3" textAlign="left" style={{ padding: "10%" }}>D-{3-num?3-num:"day"}</Header>
                <Button className={styles.threeopen} color="pink" onClick={()=>{ writeDetail(num) }}>열기</Button>
                <br /><br />
                <Button className={styles.threewrap} color="pink" onClick={()=>{ writeWrap(num) }}>포장지 선택</Button>
                <br /><br />
            </div>
        </>
    );
}