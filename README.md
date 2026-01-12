<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1lTA1b93D_giIahgLKGfQG-USSq4Sj0Rj

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

英语雅思考试的所有单词、排序，同时给出每个词的释义，然后帮我生成单词flashcard的互动html页面，辅助单词记忆
1.界面要求精美直观，单词卡片可以3d翻转，卡片下面有一个随机切换下一次的按钮
2.交互按钮要能正常使用，布局合理，不要有重叠
3.所有单词都要包含其中，一次生成完，不可省略
4.增加生词本功能，在卡片上添加一个收藏按钮（心形图标），点击后收藏当前单词，且按钮状态改变。在页面上添加一个“查看生词本”按钮，点击后弹出一个模态框，展示已收藏的单词列表，每个单词旁边有移除按钮。
5.使用本地存储来保存收藏的单词，这样刷新页面后数据不会丢失。
6.每个单词除了展示单词的中文含义，还要加例句，可以原音跟读
