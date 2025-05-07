import Icon from '@mdi/react';
import { mdiLinkVariant } from '@mdi/js';
import { motion } from "motion/react";

const PassResultCard = ({searchResult, resultRef}) => {

	const formatMajor= (major) => {
    const map = {
      web_design: "Web Design",
      web_content: "Web Content",
      web_programming: "Web Programming",
      web_marketing: "Web Marketing"
    };
    return map[major];
  }
    
	return(
		<div 
			className="bg-white/5 rounded-2xl px-8 py-10 mx-auto max-w-md w-full flex flex-col items-center gap-4 text-center shadow-lg border border-white/10 backdrop-blur-sm"
			ref={resultRef}
		>

			<h2 className="text-2xl font-semibold text-white">🎉 ขอแสดงความยินดีกับ</h2>

			<motion.div 
				initial={{ opacity: 0 }} 
				animate={{ opacity: 1 }} 
				transition={{ delay: 0.3, duration: 0.5 }}
				className="relative w-fit"
			>
				<div className="absolute -inset-1 rounded-lg blur-md opacity-60" style={{ backgroundImage: "var(--color-y20-gradientR)" }} />
				<div className="relative px-6 py-3 rounded-lg bg-white/10 border border-white/20">
					<p className="text-white text-xl font-semibold tracking-wide">
						{searchResult.firstName} {searchResult.lastName}
					</p>
				</div>
			</motion.div>

			<div className="text-sm px-4 py-1 rounded-md bg-white/10 text-white/90 border border-white/10">
				เลขประจำตัวผู้เข้าสัมภาษณ์ : {searchResult.interviewRefNo}
			</div>

			<h3 className="text-white/90 text-lg">คุณผ่านเข้าสู่รอบสัมภาษณ์ในสาขา</h3>

			<div className="text-xl font-extrabold text-white tracking-wide bg-(image:--color-y20-gradientR) text-gradient">
				{formatMajor(searchResult.major)}
			</div>

			<p className="mt-4 text-sm text-white/80 text-center">
				ตรวจสอบรายละเอียดการสัมภาษณ์ได้ที่{" "}
				<a
					href={`https://ywc20.ywc.in.th/interview/${searchResult.major.replace("web_", "")}`}
					target="_blank"
					className="inline-flex items-end text-white underline underline-offset-4 hover:text-yellow-300 transition-colors duration-200"
				>
					รายละเอียดการสัมภาษณ์ <Icon path={mdiLinkVariant} size={0.8} />
				</a>
			</p>

		</div>
	)
}

export default PassResultCard;