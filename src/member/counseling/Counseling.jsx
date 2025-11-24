import React, { useState, useRef, useEffect } from "react";
import styles from "./Counseling.module.css"; // CSS 모듈 import
import pointImg from "./img/point.png"; // 전송 버튼 이미지 import

// Counseling 컴포넌트: 긴급 상담 채팅창
const Counseling = ({ onClose }) => {
  const messageEndRef = useRef(null); // 채팅 스크롤을 마지막 메시지로 이동시키기 위한 ref
  const [inputText, setInputText] = useState(""); // 입력창 상태
  const [messages, setMessages] = useState([]); // 채팅 메시지 배열 상태

  // ⭐ 컴포넌트가 처음 렌더링될 때 챗봇이 먼저 인사 메시지 전송
  useEffect(() => {
    const now = new Date();
    const formatTime = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    setMessages([
      {
        text: "긴급 챗봇입니다. 무엇을 도와드릴까요?",
        sender: "other",
        time: formatTime,
        senderName: "챗봇",
        buttons: ["test1", "test2", "test3"]
      }
    ]);
  }, []);

  // 메시지 전송 함수
  const sendMessage = () => {
    if (inputText.trim() === "") return; // 입력이 비어있으면 전송 X

    const now = new Date(); // 현재 시간
    const formatTime = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }); // HH:MM 형식

    // 메시지 배열에 추가: 사용자가 보낸 메시지 + 챗봇 응답 메시지
    setMessages(prev => [
      ...prev,
      { text: inputText, sender: "me", time: formatTime, senderName: "나" },
      {
        text: "긴급 챗봇입니다. 무엇을 도와드릴까요?",
        sender: "other",
        time: formatTime,
        senderName: "챗봇",
        buttons: [
          "test1",
          "test2",
          "test3"
        ]
      }
    ]);

    setInputText(""); // 입력창 초기화
  };

  // 메시지가 추가될 때마다 스크롤을 마지막 메시지로 이동
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className={styles.container}>
      {/* 왼쪽 배경 클릭 시 채팅창 닫기 */}
      <div className={styles.left} onClick={onClose}></div>

      <div className={styles.right}>
        {/* 채팅창 상단 */}
        <div className={styles.up}>
          <div className={styles.oneonenine}>긴급 상담</div>
        </div>

        {/* 채팅창 하단: 메시지 표시 영역 + 입력 영역 */}
        <div className={styles.down}>
          {/* 메시지 표시 영역 */}
          <div className={styles.chatbody}>
            <div className={styles.mes}>
              {messages.map((msg, idx) => {
                const isMe = msg.sender === "me"; // 내가 보낸 메시지인지 확인

                return (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: isMe ? "flex-end" : "flex-start",
                      marginBottom: "10px",
                      gap: "2px",
                      width: "100%"
                    }}
                  >
                    {/* 발신자 이름 */}
                    {msg.senderName && (
                      <span style={{ fontSize: "16px", fontWeight: "bold", color: "#808080" }}>
                        {msg.senderName}
                      </span>
                    )}

                    {/* 시간과 말풍선 */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-end",
                        justifyContent: isMe ? "flex-end" : "flex-start",
                        gap: "5px",
                        width: "100%",
                        flexWrap: "wrap"
                      }}
                    >
                      {/* 시간: 내가 보낸 메시지 왼쪽 */}
                      {isMe && <span style={{ fontSize: "12px", color: "#888" }}>{msg.time}</span>}

                      {/* 말풍선 */}
                      <div
                        style={{
                          maxWidth: "70%",
                          backgroundColor: isMe ? "#FFF4D6" : "#D6F0FF",
                          padding: "10px 14px",
                          borderRadius: "15px",
                          fontSize: "14px",
                          wordWrap: "break-word",
                          overflowWrap: "break-word",
                          whiteSpace: "pre-wrap",
                          display: "flex",
                          flexDirection: "column",
                          gap: "5px",
                          boxSizing: "border-box"
                        }}
                      >
                        <span>{msg.text}</span>

                        {/* 챗봇 버튼 */}
                        {!isMe && msg.buttons && (
                          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                            {msg.buttons.map((btnText, i) => (
                              <button
                                key={i}
                                style={{
                                  padding: "5px 10px",
                                  borderRadius: "5px",
                                  border: "1px solid #808080",
                                  background: "#fff",
                                  cursor: "pointer",
                                  fontSize: "12px",
                                  wordWrap: "break-word",
                                  overflowWrap: "break-word",
                                  whiteSpace: "normal"
                                }}
                              >
                                {btnText}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* 챗봇 메시지 시간 (오른쪽) */}
                      {!isMe && <span style={{ fontSize: "12px", color: "#888" }}>{msg.time}</span>}
                    </div>
                  </div>
                );
              })}
              <div ref={messageEndRef}></div> {/* 마지막 메시지 ref */}
            </div>
          </div>

          {/* 메시지 입력 영역 */}
          <div className={styles.chatmessage}>
            <div className={styles.chme}>
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="메시지를 입력하세요"
                onKeyDown={(e) => {
                  if (e.key === "Enter") sendMessage(); // Enter 입력 시 전송
                }}
              />
              <button className={styles.send} onClick={sendMessage}>
                <img src={pointImg} alt="send" /> {/* 전송 버튼 이미지 */}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Counseling;
