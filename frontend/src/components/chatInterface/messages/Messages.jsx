import { useEffect, useRef } from "react";
import useGetMessages from "../../../hooks/useGetMessages";
import Message from "./Message";
import useListenMessages from "../../../hooks/useListenMessage";

const Messages = () => {
	const { messages, loading } = useGetMessages();
	useListenMessages();
	const lastMessageRef = useRef();

	useEffect(() => {
		setTimeout(() => {
			lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
		}, 100);
	}, [messages]);

	return (
		<div className='px-4 flex-1 overflow-auto'>
			{!loading &&
				messages.length > 0 &&
				messages.map((message) => (
					<div key={message.id} ref={lastMessageRef}>
						<Message message={message} />
					</div>
				))}
		</div>
	);
};
export default Messages;
