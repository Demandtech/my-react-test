import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { FaArrowUp } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
const Card = ({ index, data, handleCardMove }) => {
	const id = uuidv4();
	const ref = useRef(null);
	const [{ isDragging }, drag] = useDrag({
		type: "CARD",
		item: { id, index },
		collect: (monitor) => ({
			isDragging: !!monitor.isDragging(),
		}),
	});

	const [, drop] = useDrop({
		accept: "CARD",
		hover(item, monitor) {
			const dragIndex = item.index;
			const hoverIndex = index;
			if (dragIndex === hoverIndex) {
				return;
			}

			const hoverBoundingRect = ref.current.getBoundingClientRect();
			const hoverMiddleY =
				(hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
			const clientOffset = monitor.getClientOffset();
			const hoverClientY = clientOffset.y - hoverBoundingRect.top;
			if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
				return;
			}
			if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
				return;
			}
			handleCardMove(dragIndex, hoverIndex);
			item.index = hoverIndex;
		},
	});
	drag(drop(ref));
	return (
		<div
			ref={ref}
			className="mb-2 py-3  px-4   rounded-lg flex "
			style={{
				border: "1px solid rgba(255, 255, 255, 0.12)",
				opacity: isDragging ? 0.5 : 1,
			}}
		>
			<div className="flex w-[48%] mr-24 items-center">
				<span className="text-[#666666] pr-5 text-sm font-thin p-3">
					{String(index + 1).padStart(2, "0")}
				</span>
				<div className=" min-w-[118px] h-16 mr-4 ">
					<img
						src={data.photo}
						alt={data.username}
						className="h-full w-full object-cover object-top rounded"
					/>
				</div>
				<p className="text-[#ffffff]  font-thin text-2xl line-clamp-2">
					{data.title}
				</p>
			</div>
			<div className="flex items-center gap-2">
				<div className="w-6 h-6">
					<img
            className="rounded-full w-full h-full object-cover object-center"
            src={data.photo}
            // alt={author}
          />
				</div>
				<span className="text-[#DBFD51] font-thin">{data.username}</span>
			</div>
			<div className="flex items-center gap-1 ml-auto">
				<span className="text-[#ffffff]  font-thin">{data.like}</span>
				<FaArrowUp className="text-[#9bff00] " />
			</div>
		</div>
	);
};

export default Card;
