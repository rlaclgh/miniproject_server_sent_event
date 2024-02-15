"use client";
import Header from "@/components/header";
import Questions from "@/components/quetions";

export default function Home() {
  return (
    <div>
      <Header renderCenter={() => <div>메인 페이지</div>} />

      <Questions />
    </div>
  );
}
