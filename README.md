# Smart Student ID Generator 🎓

A modern web application for generating customizable student ID cards with QR codes, built with React, TypeScript, and Tailwind CSS.
![Screenshot 2025-04-10 131350](https://github.com/user-attachments/assets/3fded109-f335-4756-9e67-6b788e781de9)
![Screenshot 2025-04-10 131402](https://github.com/user-attachments/assets/00b0dc75-2896-44b1-b963-90c9d941587f)
![Screenshot 2025-04-10 131415](https://github.com/user-attachments/assets/8fd3500d-7c9c-4964-b977-1c776504c6fc)

## ✨ Features
- **Two Template Designs** (Modern & Classic)
- **QR Code Integration** (Stores student data)
- **Download as PNG** (Export high-quality IDs)
- **Responsive Layout** (Works on all devices)
- **Type-Safe Codebase** (TypeScript)
- **Medical Alert System** (Allergies display)

## 🧠 Thought Process & Architecture

### Problem Identification
Traditional student ID cards:
- Are static and non-interactive
- Lack quick-access digital information
- Have limited design flexibility
- Require specialized software to create

### Solution Approach
1. **Dynamic Data Binding**
   - Created React components that accept student data as props
   - Designed flexible templates that adapt to different school requirements

2. **QR Code Integration**
   - Used `qrcode.react` to embed student data
   - JSON structure stores all essential information for scanning

3. **Design System**
   - Implemented two distinct visual styles:
     - **Modern**: Gradient background with translucent elements
     - **Classic**: Clean white layout with traditional school aesthetics
   - Ensured pixel-perfect consistency between templates

4. **Export Functionality**
   - Added `html-to-image` conversion for PNG downloads
   - Implemented responsive sizing for print-quality exports

5. **Responsive Considerations**
   - Used Tailwind's responsive utilities (sm/md/lg breakpoints)
   - Maintained identical dimensions across templates
   - Optimized QR code sizing for mobile scanning

## 🛠️ Tech Stack
- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **QR Generation**: `qrcode.react`
- **Image Export**: `html-to-image`
- **Icons**: Lucide React

## 🚀 Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/smart-student-id-generator.git

2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

📝 Usage
1. Import the `IDCard` component:
   ```tsx
   import IDCard from './components/IDCard';
   ```
2. Pass student data and template preference:
   ```tsx
   <IDCard 
     student={{
       name: "Jane Doe",
       rollNumber: "2023-001",
       class: "10",
       division: "A",
       photo: "/path/to/photo.jpg",
       allergies: ["Peanuts"],
       rackNumber: "B-12",
       busRoute: "Route 42"
     }}
     template={{ id: "modern" }} // or "classic"
   />
   ```

📂 Project Structure
```
/src
├── components/
│   └── IDCard.tsx       # Main ID card generator
|   └── StudentForm.tsx
├── types/
│   └── index.ts          # Type definitions
├── App.tsx               # Main application
└── index.css             # Global styles

 License
MIT © [saikumar]

