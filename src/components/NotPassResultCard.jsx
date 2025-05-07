const NotPassResultCard = () => {
	return(
		<div className="bg-white/5 rounded-2xl p-8 mx-auto max-w-md w-full flex flex-col items-center gap-4 text-center shadow-lg border border-white/10 backdrop-blur-sm">

			<h2 className="text-2xl font-semibold text-white">ขอบคุณที่สมัคร 💙</h2>

			<p className="text-white/70 text-base max-w-sm">
				คุณยังไม่ผ่านเข้าสู่รอบสัมภาษณ์ในครั้งนี้
			</p>

			<p className="text-white/50 text-sm max-w-xs">
				การกล้าก้าวออกมา คือสิ่งที่น่าภูมิใจเสมอ  
				อย่าหยุดพัฒนา และกลับมาใหม่ได้เสมอ :)
			</p>

		</div>
	)
}

export default NotPassResultCard;