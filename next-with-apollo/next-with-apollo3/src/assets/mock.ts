const MOCK_DATA = {
  todos: [
    {
      id: 1,
      title: "노트 사러가기",
      level: 1,
      isClosed: false,
    },
    {
      id: 2,
      title: "강아지 밥 주기",
      level: 3,
      isClosed: true,
    },
    {
      id: 3,
      title: "방 청소하기",
      level: 2,
      isClosed: false,
    },
    {
      id: 4,
      title: "은행 업무보기",
      level: 2,
      isClosed: false,
    },
    {
      id: 5,
      title: "사무실 들려서 PC 세팅하기",
      level: 1,
      isClosed: false,
    },
  ],
  levels: [
    {
      id: 1,
      name: "low",
    },
    { id: 2, name: "normal" },
    { id: 3, name: "high" },
  ],
};

export default MOCK_DATA;
