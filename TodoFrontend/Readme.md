# HOW TO RUN 

### Install Dependency

```
pnpm i 
```

### run project 
```
make up
cd TodoBackend
pnpm run dev
```

# Project Structure 

### Dependency

	- React + TypeScript
		ใช้ React เเละ Typescript ในการ สร้าง UI Interface 

	- Tailwindcss
		ใช้ Tailwindcss ในการ ตกเเต่งหน้าเว็บให้สวยงามมมมม

	- Vite
		สร้าง Project React Typescript ด้วย Vite เพราะว่า โครตเร็ว โครตง่าย โครตตตตตต 

	- Axios
		ใช้ Axios ให้การส่ง Request ไปที่ Todo API 

	- Motion
		ใช้ Motion ในการทำ Animation ของ Components ต่างๆๆ	

### Components
	- Add Todo Modal
		เป็น Components สำหรับเพิ่ม Todo Task 

	- Todo Content
		เป็น Components ที่เมื่อ user กดปุ่ม Get Started จะเจอหน้า Todo Content ถ้าไม่มี Task เลยจะคิดว่า Add your first task เเต่ถ้ามี Task อยุ่จะ Render ด้วย Todo Item เเละมีปุ่ม Add More Task เวลา user กดปุ่ม add Task ก็จะเรียก Add Todo Modal  

	- Todo Item
		เป็น Components สำหรับ Render Todo item โดยจะสามารถ กดเพื่อ Complete ได้เเละสร้าง Edit Delete ได้ 

	- TypingAnimation
		เป็น Components สำหรับจัดการ Typing animation ในหน้า WelcomeText  โดยใช้ lib Motion

	- WelcomeText
		เป็น Components เเรกที่ user จะเจอ ตอนที่เปิดเข้าเว็บมา 

### Context
	- TodoContext
		เป็นที่รวม context สำหรับดึงข้อมูลจาก TODO API 
