import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import WeeklyCalender from "@/components/WeeklyCalender";

const inter = Inter({ subsets: ["latin"] });
console.log("주소", process.env.NEXT_PUBLIC_API_URL);

export default function Home() {
  return (
    <>
      <Head>
        <title>Home Page</title>
      </Head>
      <div>
        <p>여기에 내용을 작성하세요.</p>
      </div>
    </>
  );
}
