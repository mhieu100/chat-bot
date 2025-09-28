import {
  AppstoreAddOutlined,
  CloudUploadOutlined,
  CommentOutlined,
  CopyOutlined,
  DeleteOutlined,
  DislikeOutlined,
  EditOutlined,
  EllipsisOutlined,
  FileSearchOutlined,
  HeartOutlined,
  LikeOutlined,
  MedicineBoxOutlined,
  PaperClipOutlined,
  PlusOutlined,
  ProductOutlined,
  QuestionCircleOutlined,
  ReloadOutlined,
  ScheduleOutlined,
  ShareAltOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import {
  Attachments,
  Bubble,
  Conversations,
  Prompts,
  Sender,
  Welcome,
} from "@ant-design/x";
import { Avatar, Button, Flex, Space, Spin, message } from "antd";
import { createStyles } from "antd-style";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import VaccineDrawer from './VaccineDrawer';
import VaccineConsultationForm from './VaccineConsultationForm';
import QuickActionMenu from './QuickActionMenu';

const DEFAULT_CONVERSATIONS_ITEMS = [
  {
    key: "default-0",
    label: "Lịch tiêm chủng cho trẻ em",
    group: "Hôm nay",
  },
  {
    key: "default-1",
    label: "Vaccine COVID-19 mũi nhắc lại",
    group: "Hôm nay",
  },
  {
    key: "default-2",
    label: "Tác dụng phụ sau tiêm vaccine",
    group: "Hôm qua",
  },
];

const HOT_TOPICS = {
  key: "1",
  label: "Chủ đề nóng về Sức khỏe",
  children: [
    {
      key: "1-1",
      description: "Lịch tiêm chủng cơ bản cho trẻ em theo độ tuổi",
      icon: <span style={{ color: "#f93a4a", fontWeight: 700 }}>1</span>,
    },
    {
      key: "1-2",
      description: "Vaccine COVID-19: Khi nào cần tiêm mũi nhắc lại?",
      icon: <span style={{ color: "#ff6565", fontWeight: 700 }}>2</span>,
    },
    {
      key: "1-3",
      description: "Cách xử lý tác dụng phụ sau tiêm vaccine",
      icon: <span style={{ color: "#ff8f1f", fontWeight: 700 }}>3</span>,
    },
    {
      key: "1-4",
      description: "Vaccine phòng cúm mùa: Ai nên tiêm và khi nào?",
      icon: <span style={{ color: "#00000040", fontWeight: 700 }}>4</span>,
    },
    {
      key: "1-5",
      description: "Vaccine HPV: Phòng chống ung thư cổ tử cung",
      icon: <span style={{ color: "#00000040", fontWeight: 700 }}>5</span>,
    },
  ],
};

const DESIGN_GUIDE = {
  key: "2",
  label: "Hướng dẫn Sức khỏe",
  children: [
    {
      key: "2-1",
      icon: <HeartOutlined />,
      label: "Phòng bệnh",
      description: "Vaccine giúp phòng ngừa các bệnh nguy hiểm",
    },
    {
      key: "2-2",
      icon: <SmileOutlined />,
      label: "An toàn",
      description: "Vaccine đã được kiểm nghiệm kỹ lưỡng về độ an toàn",
    },
    {
      key: "2-3",
      icon: <CommentOutlined />,
      label: "Tư vấn",
      description: "Nhận tư vấn chuyên môn về tiêm chủng",
    },
    {
      key: "2-4",
      icon: <PaperClipOutlined />,
      label: "Theo dõi",
      description: "Theo dõi lịch tiêm và tình trạng sức khỏe",
    },
  ],
};

const SENDER_PROMPTS = [
  {
    key: "1",
    description: "Lịch tiêm chủng",
    icon: <ScheduleOutlined />,
  },
  {
    key: "2",
    description: "Các loại vaccine",
    icon: <ProductOutlined />,
  },
  {
    key: "3",
    description: "Tác dụng phụ",
    icon: <FileSearchOutlined />,
  },
  {
    key: "4",
    description: "Hướng dẫn tiêm",
    icon: <AppstoreAddOutlined />,
  },
];

const useStyle = createStyles(({ token, css }) => {
  return {
    layout: css`
      width: 100%;
      min-width: 1000px;
      height: 100vh;
      display: flex;
      background: ${token.colorBgContainer};
      font-family: AlibabaPuHuiTi, ${token.fontFamily}, sans-serif;
    `,
    // sider 样式
    sider: css`
      background: ${token.colorBgLayout}80;
      width: 280px;
      height: 100%;
      display: flex;
      flex-direction: column;
      padding: 0 12px;
      box-sizing: border-box;
    `,
    logo: css`
      display: flex;
      align-items: center;
      justify-content: start;
      padding: 0 24px;
      box-sizing: border-box;
      gap: 8px;
      margin: 24px 0;

      span {
        font-weight: bold;
        color: ${token.colorText};
        font-size: 16px;
      }
    `,
    addBtn: css`
      background: #1677ff0f;
      border: 1px solid #1677ff34;
      height: 40px;
    `,
    conversations: css`
      flex: 1;
      overflow-y: auto;
      margin-top: 12px;
      padding: 0;

      .ant-conversations-list {
        padding-inline-start: 0;
      }
    `,
    siderFooter: css`
      border-top: 1px solid ${token.colorBorderSecondary};
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    `,
    // chat list 样式
    chat: css`
      height: 100%;
      width: 100%;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      padding-block: ${token.paddingLG}px;
      gap: 16px;
    `,
    chatPrompt: css`
      .ant-prompts-label {
        color: #000000e0 !important;
      }
      .ant-prompts-desc {
        color: #000000a6 !important;
        width: 100%;
      }
      .ant-prompts-icon {
        color: #000000a6 !important;
      }
    `,
    chatList: css`
      flex: 1;
      overflow: auto;
    `,
    loadingMessage: css`
      background-image: linear-gradient(
        90deg,
        #ff6b23 0%,
        #af3cb8 31%,
        #53b6ff 89%
      );
      background-size: 100% 2px;
      background-repeat: no-repeat;
      background-position: bottom;
    `,
    placeholder: css`
      padding-top: 32px;
    `,
    // sender 样式
    sender: css`
      width: 100%;
      max-width: 700px;
      margin: 0 auto;
    `,
    speechButton: css`
      font-size: 18px;
      color: ${token.colorText} !important;
    `,
    senderPrompt: css`
      width: 100%;
      max-width: 700px;
      margin: 0 auto;
      color: ${token.colorText};
    `,
    markdownContent: css`
      line-height: 1.6;
      
      h1, h2, h3, h4, h5, h6 {
        margin: 16px 0 8px 0;
        color: ${token.colorTextHeading};
        font-weight: 600;
      }
      
      h1 { font-size: 20px; }
      h2 { font-size: 18px; }
      h3 { font-size: 16px; }
      
      p {
        margin: 8px 0;
        color: ${token.colorText};
      }
      
      ul, ol {
        margin: 12px 0;
        padding-left: 20px;
      }
      
      li {
        margin: 6px 0;
        color: ${token.colorText};
        line-height: 1.5;
      }
      
      li::marker {
        color: ${token.colorPrimary};
        font-weight: bold;
      }
      
      strong {
        color: ${token.colorTextHeading};
        font-weight: 600;
      }
      
      em {
        font-style: italic;
        color: ${token.colorTextSecondary};
      }
      
      code {
        background: ${token.colorFillSecondary};
        padding: 2px 6px;
        border-radius: 4px;
        font-family: ${token.fontFamilyCode};
        font-size: 0.9em;
      }
      
      pre {
        background: ${token.colorFillSecondary};
        padding: 12px;
        border-radius: 8px;
        overflow-x: auto;
        margin: 12px 0;
      }
      
      blockquote {
        border-left: 3px solid ${token.colorPrimary};
        padding-left: 12px;
        margin: 12px 0;
        color: ${token.colorTextSecondary};
        background: ${token.colorFillTertiary};
        padding: 12px;
        border-radius: 0 8px 8px 0;
      }
      
      .emoji {
        font-size: 1.2em;
        margin-right: 4px;
      }
    `,
    // Responsive styles for mobile
    responsiveLayout: css`
      @media (max-width: 768px) {
        .vaccine-fab {
          bottom: 100px !important;
          right: 20px !important;
          width: 48px !important;
          height: 48px !important;
          font-size: 18px !important;
        }
        
        .quick-toolbar {
          padding: 8px 12px !important;
        }
        
        .vaccine-card {
          padding: 8px 12px !important;
          margin-top: 12px !important;
        }
      }
      
      @media (max-width: 480px) {
        .vaccine-fab {
          bottom: 80px !important;
          right: 15px !important;
          width: 44px !important;
          height: 44px !important;
          font-size: 16px !important;
        }
      }
    `,
  };
});

// Component để render message với markdown
const MessageContent = ({ content, isAssistant, className, isTyping = false, onShowVaccineDrawer, onActionClick }) => {
  const { styles } = useStyle();
  
  // Detect vaccine mentions in content
  const hasVaccineMention = isAssistant && content && 
    /vaccine|vắc xin|tiêm chủng|ngừa|phòng bệnh|hepatitis|viêm gan|sởi|rubella|bạch hầu|ho gà|uốn ván|polio|bcg|lao|não mô cầu|meningitis|não màng|hpv|u cổ tử cung|cúm|influenza|zona|thủy đậu|varicella|rotavirus|viêm ruột|dại|rabies/i.test(content);
  
  // Detect if this is a greeting/fallback response that should show QuickActionMenu
  const isGreetingResponse = isAssistant && content && (
    content.includes('🤖 **Chào bạn!**') ||
    content.includes('Tôi là trợ lý AI') ||
    content.includes('Bạn cần hỗ trợ gì hôm nay')
  );
  
  if (!isAssistant) {
    // User message - render as plain text
    return <div className={className}>{content}</div>;
  }
  
  // Assistant message - render with markdown
  return (
    <div className={`${className} ${styles.markdownContent}`}>
      {isTyping ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Spin size="small" />
          <span style={{ fontStyle: 'italic', color: '#8c8c8c' }}>
            {content}
          </span>
        </div>
      ) : (
        <>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              // Custom components for better styling
              h1: ({children}) => <h1 style={{color: '#1677ff'}}>{children}</h1>,
              h2: ({children}) => <h2 style={{color: '#1677ff'}}>{children}</h2>,
              h3: ({children}) => <h3 style={{color: '#1677ff'}}>{children}</h3>,
              strong: ({children}) => <strong style={{color: '#262626', fontWeight: 600}}>{children}</strong>,
              em: ({children}) => <em style={{color: '#595959'}}>{children}</em>,
              li: ({children}) => <li style={{marginBottom: '4px'}}>{children}</li>,
              // Style cho emoji
              span: ({children, ...props}) => {
                if (typeof children === 'string' && /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/u.test(children)) {
                  return <span className="emoji" {...props}>{children}</span>;
                }
                return <span {...props}>{children}</span>;
              },
            }}
          >
            {content}
          </ReactMarkdown>
          {hasVaccineMention && onShowVaccineDrawer && (
            <div style={{ 
              marginTop: '16px',
              padding: '12px',
              background: 'linear-gradient(135deg, #f6ffed 0%, #f0f9ff 100%)',
              border: '1px solid #b7eb8f',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <div style={{ 
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                flex: 1
              }}>
                <MedicineBoxOutlined style={{ 
                  color: '#52c41a',
                  fontSize: '18px'
                }} />
                <div>
                  <div style={{ 
                    fontWeight: 600,
                    color: '#135200',
                    fontSize: '14px',
                    marginBottom: '2px'
                  }}>
                    💉 Danh sách Vaccine phù hợp
                  </div>
                  <div style={{ 
                    fontSize: '12px',
                    color: '#52c41a'
                  }}>
                    Xem chi tiết và đặt lịch tiêm ngay
                  </div>
                </div>
              </div>
              <Button
                type="primary"
                size="medium"
                icon={<MedicineBoxOutlined />}
                onClick={() => onShowVaccineDrawer(content)}
                style={{
                  backgroundColor: '#52c41a',
                  borderColor: '#52c41a',
                  borderRadius: '20px',
                  fontWeight: 600,
                  height: '36px',
                  paddingLeft: '16px',
                  paddingRight: '16px',
                  boxShadow: '0 2px 8px rgba(82, 196, 26, 0.3)',
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#389e0d';
                  e.target.style.transform = 'translateY(-1px)';
                  e.target.style.boxShadow = '0 4px 12px rgba(82, 196, 26, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#52c41a';
                  e.target.style.transform = 'translateY(0px)';
                  e.target.style.boxShadow = '0 2px 8px rgba(82, 196, 26, 0.3)';
                }}
              >
                Xem ngay
              </Button>
            </div>
          )}
          {isGreetingResponse && onActionClick && (
            <QuickActionMenu 
              visible={true}
              onActionClick={onActionClick}
            />
          )}
        </>
      )}
    </div>
  );
};

const Independent = () => {
  const { styles } = useStyle();

  // ==================== State ====================
  const [messageHistory, setMessageHistory] = useState({});

  const [conversations, setConversations] = useState(
    DEFAULT_CONVERSATIONS_ITEMS
  );
  const [curConversation, setCurConversation] = useState(
    DEFAULT_CONVERSATIONS_ITEMS[0].key
  );

  const [attachmentsOpen, setAttachmentsOpen] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [vaccineDrawerOpen, setVaccineDrawerOpen] = useState(false);
  const [drawerVaccines, setDrawerVaccines] = useState([]);
  const [drawerTitle, setDrawerTitle] = useState("Vaccine được đề xuất");

  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showConsultationForm, setShowConsultationForm] = useState(false);

  // Backend API URL
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

  // ==================== Vaccine Functions ====================

  const showVaccineDrawer = async (aiResponseContent = "", title = "Vaccine được đề xuất") => {
    try {
      // Extract vaccine names from AI response content
      const vaccineNames = extractVaccineNamesFromAIResponse(aiResponseContent);
      
      if (vaccineNames.length > 0) {
        // Query specific vaccines by names
        const response = await fetch(`${API_BASE_URL}/vaccines/by-names`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            vaccine_names: vaccineNames
          })
        });
        
        const data = await response.json();
        
        if (data.status === 'success' && data.vaccines.length > 0) {
          setDrawerVaccines(data.vaccines);
          setDrawerTitle(`💉 ${data.vaccines.length} Vaccine được AI đề xuất`);
          setVaccineDrawerOpen(true);
        } else {
          // Fallback to show all vaccines if specific names not found
          showAllVaccinesDrawer(title);
        }
      } else {
        // Show all vaccines if no specific names found
        showAllVaccinesDrawer(title);
      }
    } catch (error) {
      console.error('Error fetching specific vaccines:', error);
      showAllVaccinesDrawer(title);
    }
  };
  
  // Helper function to extract vaccine names from AI response
  const extractVaccineNamesFromAIResponse = (content) => {
    if (!content || typeof content !== 'string') return [];
    
    const content_lower = content.toLowerCase();
    const foundVaccines = [];
    
    // Define comprehensive vaccine mapping with variations matching AI responses
    const vaccineMap = {
      'Vaccine BCG': [
        'bcg', 'vaccine bcg', 'tiêm bcg', 'lao', 'bệnh lao', 
        'bach cầu', 'phòng lao', 'chống lao'
      ],
      'Vaccine COVID-19': [
        'covid', 'covid-19', 'covid 19', 'corona', 'coronavirus', 
        'sars-cov-2', 'vaccine covid', 'tiêm covid', 'mũi covid',
        'vaccine phòng covid-19', 'phòng covid'
      ],
      'Vaccine Cúm': [
        'cúm', 'cum', 'influenza', 'flu', 'vaccine cúm', 
        'tiêm cúm', 'phòng cúm', 'cúm mùa', 'vaccine phòng cúm mùa'
      ],
      'Vaccine Viêm gan B': [
        'viêm gan b', 'viem gan b', 'hepatitis b', 'hep b',
        'vaccine viêm gan b', 'tiêm viêm gan b', 'gan b'
      ],
      'Vaccine Viêm gan A': [
        'viêm gan a', 'viem gan a', 'hepatitis a', 'hep a',
        'vaccine viêm gan a', 'tiêm viêm gan a', 'gan a'
      ],
      'Vaccine Sởi': [
        'sởi', 'soi', 'measles', 'rubella', 'vaccine sởi',
        'tiêm sởi', 'phòng sởi', 'bệnh sởi', 'mmr', 'sởi - quai bị - rubella'
      ],
      'Vaccine Phế cầu': [
        'phế cầu', 'phe cau', 'pneumococcal', 'phế cầu khuẩn',
        'vaccine phế cầu', 'tiêm phế cầu', 'viêm phổi'
      ],
      'Vaccine HPV': [
        'hpv', 'vaccine hpv', 'u cổ tử cung', 'papilloma', 
        'ung thư cổ tử cung', 'tiêm hpv', 'phòng ung thư cổ tử cung'
      ],
      'Vaccine Uốn ván': [
        'uốn ván', 'uon van', 'tetanus', 'vaccine uốn ván',
        'bạch hầu - ho gà - uốn ván', 'tdap', 'boostrix',
        'vaccine phòng bạch hầu', 'ho gà', 'bạch hầu'
      ]
    };
    
    // Search for vaccine mentions with better matching
    Object.entries(vaccineMap).forEach(([vaccineName, keywords]) => {
      const found = keywords.some(keyword => {
        // Exact match or contains match
        return content_lower.includes(keyword.toLowerCase());
      });
      
      if (found && !foundVaccines.includes(vaccineName)) {
        foundVaccines.push(vaccineName);
      }
    });
    
    return foundVaccines;
  };
  
  // Fallback function to show all vaccines
  const showAllVaccinesDrawer = async (title = "Tất cả Vaccine") => {
    try {
      const response = await fetch(`${API_BASE_URL}/vaccines`);
      const data = await response.json();
      
      if (data.status === 'success') {
        setDrawerVaccines(data.vaccines);
        setDrawerTitle(title);
        setVaccineDrawerOpen(true);
      }
    } catch (error) {
      console.error('Error fetching all vaccines:', error);
    }
  };

  const handleAskAboutVaccineFromDrawer = (question) => {
    setVaccineDrawerOpen(false);
    onSubmit(question);
  };

  // ==================== Event ====================
  const onSubmit = async (val) => {
    if (!val) return;

    if (loading) {
      message.error(
        "Request is in progress, please wait for the request to complete."
      );
      return;
    }

    // Add user message
    const userMessage = { role: "user", content: val };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    // Add temporary typing message
    const typingMessage = { 
      role: "assistant", 
      content: "🤔 Đang phân tích và tìm hiểu nhu cầu của bạn...", 
      isTyping: true 
    };
    setMessages((prev) => [...prev, typingMessage]);

    try {
      // Generate user ID from conversation if not available
      const userId = curConversation || `user_${Date.now()}`;

      // Call smart conversation API (improved system)
      const response = await fetch(`${API_BASE_URL}/chat/smart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          message: val
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.status === 'success') {
        const aiResponse = data.response;
        
        // Replace typing message with actual response
        setMessages((prev) => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = { 
            role: "assistant", 
            content: aiResponse,
            isTyping: false
          };
          return newMessages;
        });

        // Note: Auto-show drawer removed - now only manual via button click

      } else {
        throw new Error(data.error_message || 'Unknown error occurred');
      }

    } catch (error) {
      console.error('Error sending message:', error);
      
      // Replace typing message with error message
      setMessages((prev) => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1] = { 
          role: "assistant", 
          content: "Xin lỗi, đã xảy ra lỗi khi xử lý yêu cầu của bạn. Vui lòng thử lại sau.",
          isTyping: false
        };
        return newMessages;
      });

      message.error(
        error.message || 'Failed to send message. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  // ==================== Nodes ====================
  const chatSider = (
    <div className={styles.sider}>
      {/* 🌟 Logo */}
      <div className={styles.logo}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/2382/2382461.png"
          draggable={false}
          alt="logo"
          width={24}
          height={24}
        />
        <span>Trợ lý Sức khỏe AI</span>
      </div>

      {/* 🌟 添加会话 */}
      <Button
        onClick={() => {
          if (loading) {
            message.error(
              "Message is Requesting, you can create a new conversation after request done or abort it right now..."
            );
            return;
          }

          const now = dayjs().valueOf().toString();
          setConversations([
            {
              key: now,
              label: `New Conversation ${conversations.length + 1}`,
              group: "Today",
            },
            ...conversations,
          ]);
          setCurConversation(now);
          setMessages([]);
        }}
        type="link"
        className={styles.addBtn}
        icon={<PlusOutlined />}
      >
        New Conversation
      </Button>

      {/* 🌟 会话管理 */}
      <Conversations
        items={conversations}
        className={styles.conversations}
        activeKey={curConversation}
        onActiveChange={async (val) => {
          // Switch to different conversation
          setTimeout(() => {
            setCurConversation(val);
            setMessages(messageHistory?.[val] || []);
          }, 100);
        }}
        groupable
        styles={{ item: { padding: "0 8px" } }}
        menu={(conversation) => ({
          items: [
            {
              label: "Rename",
              key: "rename",
              icon: <EditOutlined />,
            },
            {
              label: "Delete",
              key: "delete",
              icon: <DeleteOutlined />,
              danger: true,
              onClick: () => {
                const newList = conversations.filter(
                  (item) => item.key !== conversation.key
                );
                const newKey = newList?.[0]?.key;
                setConversations(newList);
                // The delete operation modifies curConversation and triggers onActiveChange, so it needs to be executed with a delay to ensure it overrides correctly at the end.
                // This feature will be fixed in a future version.
                setTimeout(() => {
                  if (conversation.key === curConversation) {
                    setCurConversation(newKey);
                    setMessages(messageHistory?.[newKey] || []);
                  }
                }, 200);
              },
            },
          ],
        })}
      />

      <div className={styles.siderFooter}>
        <Avatar size={24} />
        <Button type="text" icon={<QuestionCircleOutlined />} />
      </div>
    </div>
  );
  
  // Quick Access Toolbar for easy vaccine access
  const quickToolbar = messages?.length > 0 && (
    <div style={{
      padding: '8px 16px',
      borderBottom: '1px solid #f0f0f0',
      background: '#fafafa',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Button
        type="default"
        icon={<MedicineBoxOutlined />}
        onClick={() => showAllVaccinesDrawer("📋 Danh sách Vaccine có sẵn")}
        style={{
          borderRadius: '20px',
          fontWeight: 500,
          border: '1px solid #52c41a',
          color: '#52c41a'
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = '#f6ffed';
          e.target.style.borderColor = '#389e0d';
          e.target.style.color = '#389e0d';
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = 'transparent';
          e.target.style.borderColor = '#52c41a';
          e.target.style.color = '#52c41a';
        }}
      >
        📋 Xem tất cả vaccine
      </Button>
    </div>
  );
  
  const chatList = (
    <div className={styles.chatList}>
      {messages?.length ? (
        /* 🌟 消息列表 */
        <Bubble.List
          items={messages?.map((message, index) => ({
            ...message,
            key: index,
            content: (
              <MessageContent
                content={message.content}
                isAssistant={message.role === 'assistant'}
                isTyping={message.isTyping || false}
                onShowVaccineDrawer={showVaccineDrawer}
                onActionClick={onSubmit}
                className={
                  loading && index === messages.length - 1
                    ? styles.loadingMessage
                    : ""
                }
              />
            ),
            typing: false,
          }))}
          style={{
            height: "100%",
            paddingInline: "calc(calc(100% - 700px) /2)",
          }}
          roles={{
            assistant: {
              placement: "start",
              footer: (
                <div style={{ display: "flex" }}>
                  <Button type="text" size="small" icon={<ReloadOutlined />} />
                  <Button type="text" size="small" icon={<CopyOutlined />} />
                  <Button type="text" size="small" icon={<LikeOutlined />} />
                  <Button type="text" size="small" icon={<DislikeOutlined />} />
                </div>
              ),
              loadingRender: () => <Spin size="small" />,
            },
            user: { placement: "end" },
          }}
        />
      ) : (
        <Space
          direction="vertical"
          size={16}
          style={{ paddingInline: "calc(calc(100% - 700px) /2)" }}
          className={styles.placeholder}
        >
          {/* Show consultation form or welcome screen */}
          {showConsultationForm ? (
            <VaccineConsultationForm
              onSubmit={(message) => {
                setShowConsultationForm(false);
                onSubmit(message);
              }}
              onSkip={() => setShowConsultationForm(false)}
            />
          ) : (
            <>
              <Welcome
                variant="borderless"
                icon="https://cdn-icons-png.flaticon.com/512/2382/2382461.png"
                title="Chào bạn! Tôi là Trợ lý Sức khỏe AI"
                description="Chuyên tư vấn về tiêm chủng, vaccine và chăm sóc sức khỏe. Hãy đặt câu hỏi để nhận được lời khuyên chuyên môn!"
                extra={
                  <Space>
                    <Button 
                      type="primary"
                      size="large"
                      icon={<MedicineBoxOutlined />}
                      onClick={() => setShowConsultationForm(true)}
                      style={{
                        backgroundColor: '#52c41a',
                        borderColor: '#52c41a',
                        fontWeight: 600,
                        borderRadius: '20px',
                        height: '40px',
                        paddingLeft: '20px',
                        paddingRight: '20px',
                      }}
                    >
                      🩺 Tư vấn nhanh
                    </Button>
                    <Button icon={<ShareAltOutlined />} />
                    <Button icon={<EllipsisOutlined />} />
                  </Space>
                }
              />
              
              <Flex gap={16}>
                <Prompts
                  items={[HOT_TOPICS]}
                  styles={{
                    list: { height: "100%" },
                    item: {
                      flex: 1,
                      backgroundImage:
                        "linear-gradient(123deg, #e5f4ff 0%, #efe7ff 100%)",
                      borderRadius: 12,
                      border: "none",
                    },
                    subItem: { padding: 0, background: "transparent" },
                  }}
                  onItemClick={(info) => {
                    onSubmit(info.data.description);
                  }}
                  className={styles.chatPrompt}
                />

                <Prompts
                  items={[DESIGN_GUIDE]}
                  styles={{
                    list: { height: "100%" },
                    item: {
                      flex: 1,
                      backgroundColor: "#ffffff",
                      borderRadius: 12,
                      border: "none",
                    },
                    subItem: { background: "#ffffffa6" },
                  }}
                  onItemClick={(info) => {
                    onSubmit(info.data.description);
                  }}
                  className={styles.chatPrompt}
                />
              </Flex>
            </>
          )}
        </Space>
      )}
    </div>
  );
  const senderHeader = (
    <Sender.Header
      title="Upload File"
      open={attachmentsOpen}
      onOpenChange={setAttachmentsOpen}
      styles={{ content: { padding: 0 } }}
    >
      <Attachments
        beforeUpload={() => false}
        items={attachedFiles}
        onChange={(info) => setAttachedFiles(info.fileList)}
        placeholder={(type) =>
          type === "drop"
            ? { title: "Drop file here" }
            : {
                icon: <CloudUploadOutlined />,
                title: "Upload files",
                description: "Click or drag files to this area to upload",
              }
        }
      />
    </Sender.Header>
  );
  const chatSender = (
    <>
      {/* 🌟 提示词 */}
      <Prompts
        items={SENDER_PROMPTS}
        onItemClick={(info) => {
          onSubmit(info.data.description);
        }}
        styles={{
          item: { padding: "6px 12px" },
        }}
        className={styles.senderPrompt}
      />
      {/* 🌟 输入框 */}
      <Sender
        value={inputValue}
        header={senderHeader}
        onSubmit={() => {
          onSubmit(inputValue);
          setInputValue("");
        }}
        onChange={setInputValue}
        onCancel={() => {
          // Cancel functionality can be implemented later if needed
          console.log("Cancel request");
        }}
        prefix={
          <Button
            type="text"
            icon={<PaperClipOutlined style={{ fontSize: 18 }} />}
            onClick={() => setAttachmentsOpen(!attachmentsOpen)}
          />
        }
        loading={loading}
        className={styles.sender}
        allowSpeech
        actions={(_, info) => {
          const { SendButton, LoadingButton, SpeechButton } = info.components;
          return (
            <Flex gap={4}>
              <SpeechButton className={styles.speechButton} />
              {loading ? (
                <LoadingButton type="default" />
              ) : (
                <SendButton type="primary" />
              )}
            </Flex>
          );
        }}
        placeholder="Hỏi về tiêm chủng, vaccine hoặc vấn đề sức khỏe..."
      />
      
      {/* Vaccine Drawer */}
      <VaccineDrawer
        open={vaccineDrawerOpen}
        onClose={() => setVaccineDrawerOpen(false)}
        vaccines={drawerVaccines}
        title={drawerTitle}
        onAskAboutVaccine={handleAskAboutVaccineFromDrawer}
      />
    </>
  );

  useEffect(() => {
    // history mock
    if (messages?.length) {
      setMessageHistory((prev) => ({
        ...prev,
        [curConversation]: messages,
      }));
    }
  }, [curConversation, messages]);

  // ==================== Render =================
  return (
    <div className={styles.layout}>
      {chatSider}

      <div className={styles.chat}>
        {quickToolbar}
        {chatList}
        {chatSender}
        
        {/* Floating Action Button for Vaccines */}
        {messages?.length > 0 && (
          <div style={{
            position: 'fixed',
            bottom: '120px',
            right: '30px',
            zIndex: 1000
          }}>
            <Button
              type="primary"
              shape="circle"
              size="large"
              icon={<MedicineBoxOutlined />}
              onClick={() => showAllVaccinesDrawer("💉 Tất cả Vaccine có sẵn")}
              className="vaccine-fab"
              style={{
                backgroundColor: '#52c41a',
                borderColor: '#52c41a',
                width: '56px',
                height: '56px',
                fontSize: '20px',
                boxShadow: '0 4px 16px rgba(82, 196, 26, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
              title="Xem danh sách vaccine và đặt lịch"
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)';
                e.currentTarget.style.backgroundColor = '#389e0d';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(82, 196, 26, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.backgroundColor = '#52c41a';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(82, 196, 26, 0.4)';
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Independent;
