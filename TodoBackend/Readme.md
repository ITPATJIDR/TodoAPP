# HOW TO RUN 

### Install Dependency

```
pnpm i 
```

### Prisma push

```
npm run db:push
```

### run project 
```
make up
cd TodoBackend

pnpm run build
pnpm run start
```

# Project Structure 

### Dependency
	- Express Typescript
		เป็น Backend Framework ที่จะช่วยให้เราเขียน API ง่ายขึ้น 
	- Prisma
		เป็นเครื่องมือในการจัดการ Database 
	- nodemon
		เป็นเครื่องมือในการที่ช่วยให้การ ทำงานเราง่ายขึ้น จากเดิมที่เราต้อง kill process เเละ run ให้ทุกครั้งที่มีการเปลียนเเปลง code
	- cors
		คือ Cross-Origin Resource Sharing ที่ช่วยไม่ให้ Domain อื่นๆๆสามารถมาขอใช้ทรัพยากรได้ 

### Components
	- Controller
		ใน Controller จะมี Todo Controller อยุ่ซึ่งทำหน้าที่ จัดการเรื่อง CRUD ให้กับ Todo Model

	- Router
		ใน Router จะมี Todo Router ซึ่งจัดการ กำหนด Path ที่จะ Route มาถึง Todo Controller ในเเต่ละ Function

	- Utils
		ใน Utils จะมี prisma ซึ่งเป้น ไฟล์ที่ใช้เรียก Class prisma เเล้วให้ ไฟล์อื่นๆ เอาไปเรียกใช้จะได้ ไม่ต้องสร้าง prisma instance หลายตัว
	- Prisma
		ให้ Prisma จะมี schema ของ database อยุ่ซึ่งตอนนี้มีอยุ่ model เดียวก็คือ Todo 