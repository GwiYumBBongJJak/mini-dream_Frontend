import * as styles from "./BoardLayout.styles";
import { BoardNav } from "../../components/board";
import { Outlet } from "react-router-dom";

const BoardLayout = () => {
	return (
		<styles.BoardLayout>
			<BoardNav />
			<Outlet></Outlet>
		</styles.BoardLayout>
	);
};

export default BoardLayout;
