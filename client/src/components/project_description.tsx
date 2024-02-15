"use client";

const ProjectDescription = () => {
  return (
    <div className="flex items-center h-full flex-col">
      <div className="w-120">
        <div className="text-5xl mb-10 mt-10">
          miniproject_server_sent_event
        </div>
        <div className="text-2xl my-2">1. 프로젝트 설명</div>
        <div className="text-xl my-2">1.1 페이지 진입시 서버에 연결 요청 </div>
        <div className="text-xl my-2">
          1.2 채팅 입력시 임의의 단어리스트를 stream 으로 제공{" "}
        </div>
      </div>
    </div>
  );
};

export default ProjectDescription;
