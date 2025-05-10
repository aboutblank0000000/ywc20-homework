import Icon from '@mdi/react';
import { mdiLinkVariant } from '@mdi/js';
import { motion } from "motion/react";

const PassResultCard = ({searchResult, majorStats, majorCandidatesCount, resultRef}) => {

	const formatMajor = (major) => {
		const map = {
			web_design: {	
				name: "Web Design",
				color: {
					text: "text-pink",
					bg: "bg-pink",
					hover: "hover:text-pink",
				}
			},
			web_content: {
				name: "Web Content",
				color: {
					text: "text-yellow",
					bg: "bg-yellow",
					hover: "hover:text-yellow",
				}
			},
			web_programming: {
				name: "Web Programming", 
				color: {
					text: "text-red",
					bg: "bg-red",
					hover: "hover:text-red",
				}
			},
			web_marketing: {
				name: "Web Marketing", 
				color: {
					text: "text-orange",
					bg: "bg-orange",
					hover: "hover:text-orange",
				},
			},
		};
		return map[major];
	}

	const majorInfo = formatMajor(searchResult.major);

	const major = searchResult.major.replace("web_", "")
	const totalMajorApplicants = majorStats?.find((m) => m.major === major)?.count;
    
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

			<div className={`text-xl font-extrabold tracking-wide ${majorInfo.color.text} text-gradient">`} >
				{majorInfo.name}					
			</div>

			<div>
				{totalMajorApplicants && majorCandidatesCount && (
					<div className="w-full text-left">
						<p className="text-sm text-white/70 mb-1">
							🎯 คุณคือ {" "}
							<span className="font-bold text-white/90">1 ใน {majorCandidatesCount}</span> คน 
							จากผู้สมัครทั้งหมด <span className="font-bold text-white">{totalMajorApplicants}</span> คนในสาขานี้
						</p>

						<div className="relative w-full h-3 bg-white/10 rounded-full overflow-hidden">
						<div
							className={`absolute top-0 left-0 h-full ${majorInfo.color.bg} rounded-full opacity-90`}
							style={{ width: `${(majorCandidatesCount / totalMajorApplicants) * 100}%` }}
						/>
						</div>

						<p className="text-xs text-white/80 mt-1 italic">
							นั่นคือ Top {Math.round((majorCandidatesCount / totalMajorApplicants) * 100)}% เลยนะ 🔥
						</p>
					</div>
				)}
			</div>

			<p className="mt-4 text-sm text-white/80 text-center">
				ตรวจสอบรายละเอียดการสัมภาษณ์ได้ที่{" "}
				<a
					href={`https://ywc20.ywc.in.th/interview/${searchResult.major.replace("web_", "")}`}
					target="_blank"
					className={`inline-flex items-end text-white underline underline-offset-4 ${majorInfo.color.hover} transition-colors duration-200`}
				>
					รายละเอียดการสัมภาษณ์ <Icon path={mdiLinkVariant} size={0.8} />
				</a>
			</p>

		</div>
	)
}

export default PassResultCard;