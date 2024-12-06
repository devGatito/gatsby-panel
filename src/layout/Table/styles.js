import styled from "styled-components";

export const Table = styled.table`
	width: 100%;
	border-collapse: collapse;
	font-size: 18px;
	text-align: left;
	margin-top: 20px;
	margin-bottom: 60px;
	overflow-x: auto;

	@media (max-width: 768px) {
		font-size: 16px;
	}

	@media (max-width: 480px) {
		font-size: 14px;
		display: block;
	}
`;

export const TableHead = styled.thead`
	@media (max-width: 480px) {
		display: table-header-group;
	}
`;

export const TableRow = styled.tr`
	border-bottom: 1px solid #ddd;
	transition: background-color 200ms ease;
	white-space: nowrap;
	font-size: 14px;

	&:nth-child(2n - 1):hover {
		background-color: #f6f6f6;
	}

	@media (max-width: 480px) {
		display: table-row;
	}
`;

export const TableHeader = styled.th`
	padding: 6px;
	font-weight: bold;
	color: black;
	white-space: nowrap;
	border-bottom: 2px solid #ddd;

	@media (max-width: 480px) {
		padding: 8px;
		text-align: left;
	}
`;

export const TableCell = styled.td`
	padding: 6px;
	border-bottom: 1px solid #ddd;

	@media (max-width: 480px) {
		display: table-cell;
		padding: 8px;
	}
`;

export const Actions = styled.div`
	display: flex;
	justify-content: space-around;
`;

export const ActionButton = styled.button`
	background-color: #e8f1fe;
	border: none;
	cursor: pointer;
	padding: 5px;

	img {
		width: 20px;
		height: 20px;
	}

	&:hover {
		transform: scale(1.1);
		transition: transform 0.2s ease-in-out;
	}
`;
