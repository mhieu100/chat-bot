# 🎨 Format Response Examples

## Trước khi cải thiện:

```
Vaccine COVID-19 mũi nhắc lại nên tiêm sau 6-12 tháng kể từ mũi cuối cùng. Đây là khuyến cáo của Bộ Y tế. Bạn nên tham khảo ý kiến bác sĩ.
```

## Sau khi cải thiện:

```markdown
## 💉 Vaccine COVID-19 Mũi Nhắc Lại

Chào bạn! Tôi sẽ giải đáp về lịch tiêm mũi nhắc lại vaccine COVID-19:

### ⏰ **Thời gian tiêm mũi nhắc lại:**
- **Mũi nhắc lại đầu tiên**: Sau 6-12 tháng kể từ mũi vaccine cuối cùng
- **Mũi nhắc lại tiếp theo**: Theo khuyến cáo của Bộ Y tế (thường 6-12 tháng)
- **Người có nguy cơ cao**: Có thể cần tiêm sớm hơn (tham khảo bác sĩ)

### 👥 **Ai nên ưu tiên tiêm:**
- Người trên 65 tuổi
- Người có bệnh lý nền (tim mạch, tiểu đường, hô hấp)
- Nhân viên y tế
- Người làm việc trong môi trường có nguy cơ cao

### 🔍 **Lưu ý quan trọng:**
- **Không tiêm** nếu đang mắc COVID-19 hoặc có triệu chứng
- **Chờ ít nhất 3 tháng** sau khi khỏi COVID-19 mới tiêm
- **Tham khảo bác sĩ** nếu có tiền sử dị ứng vaccine

### ✅ **Khuyến nghị:**
Hãy liên hệ với trung tâm y tế địa phương để được tư vấn cụ thể về lịch tiêm phù hợp với tình trạng sức khỏe của bạn.

*💡 Lưu ý: Thông tin này chỉ mang tính tham khảo. Luôn tham khảo ý kiến bác sĩ chuyên khoa để có lời khuyên phù hợp nhất.*
```

## 🚀 Cải thiện Format bao gồm:

### 1. **Cấu trúc rõ ràng**
- ✅ Headers với emoji
- ✅ Bullet points có tổ chức  
- ✅ Bold/italic để nhấn mạnh
- ✅ Sections logic

### 2. **Visual Appeal**
- ✅ Emoji phù hợp (💉🏥👶🤱🍎⚠️)
- ✅ Consistent formatting
- ✅ Easy scanning
- ✅ Professional look

### 3. **User Experience**
- ✅ Informative headers
- ✅ Actionable advice
- ✅ Safety warnings
- ✅ Call-to-action

### 4. **Technical Implementation**
- ✅ Markdown rendering
- ✅ Custom styling
- ✅ Responsive design
- ✅ Loading states
- ✅ Error handling

## 📱 Frontend Improvements:

### 1. **Markdown Rendering**
```jsx
<ReactMarkdown
  remarkPlugins={[remarkGfm]}
  components={{
    h1: ({children}) => <h1 style={{color: '#1677ff'}}>{children}</h1>,
    strong: ({children}) => <strong style={{fontWeight: 600}}>{children}</strong>,
  }}
>
  {content}
</ReactMarkdown>
```

### 2. **Custom Styling**
```css
.markdownContent {
  h1, h2, h3 { color: #1677ff; margin: 16px 0 8px 0; }
  strong { color: #262626; font-weight: 600; }
  li { margin: 4px 0; }
  .emoji { font-size: 1.2em; margin-right: 4px; }
}
```

### 3. **Loading States**
```jsx
{isTyping ? (
  <div>
    <Spin size="small" />
    <span>🤔 Đang suy nghĩ...</span>
  </div>
) : (
  <ReactMarkdown>{content}</ReactMarkdown>
)}
```