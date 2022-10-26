import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Input, TextArea } from "../../common";
import { useDispatch, useSelector } from "react-redux";
import {
	__getBoardItem,
	__updateBoardItem,
} from "../../redux/modules/board/boardSlice";
import { FirstHeading } from "../../common";
import useButton from "../../hooks/useButton";

const BoardEditPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { id } = useParams();
	const response = useSelector(state => state.board.boardItem);

	const [boardItem, setBoardItem] = useState({});
	const { activation } = useButton(boardItem);
	console.log("@ => boardItem", boardItem);

	// 무한렌더링
	// useEffect(() => {
	// 	dispatch(__getBoardItem(id));
	// 	setBoardItem(response);
	// }, [dispatch, id, response]);

	useEffect(() => {
		dispatch(__getBoardItem(id));
	}, [dispatch, id]);

	useEffect(() => {
		setBoardItem(response);
	}, [response]);

	const handleOnChange = e => {
		const { name, value } = e.target;
		setBoardItem({ ...boardItem, [name]: value });
	};

	const handleOnSubmit = e => {
		e.preventDefault();
		dispatch(__updateBoardItem(boardItem));
		navigate(`../detail/${id}`);
	};

	return (
		<>
			<FirstHeading>작성하기</FirstHeading>
			<Link to={-1}>뒤로가기</Link>
			<form onSubmit={handleOnSubmit}>
				{console.log("#--", boardItem)}
				<Input
					name="boardTitle"
					value={boardItem.boardTitle}
					onChange={handleOnChange}
				/>
				<Button disabled={!activation}>등록</Button>
				<TextArea
					name="boardContent"
					value={boardItem.boardContent}
					onChange={handleOnChange}
				/>
			</form>
		</>
	);
};

export default BoardEditPage;
