import React, { useState } from "react";
import {
	Table,
	TableHead,
	TableRow,
	TableHeader,
	TableCell,
	Actions,
} from "./styles";
import {
	Badge,
	Button,
	ButtonIcon,
	Flex,
	Select,
	Title,
} from "@root/src/components";
import { useEffect } from "react";

const MyTable = ({
	columns,
	data,
	showActions = true,
	onEdit,
	onDelete,
	type = null,
}) => {
	const [list, setList] = useState([]);
	const [actionFilter, setActionFilter] = useState("all");
	const [segmento, setSegmento] = useState("ALL");
	const [desarrollo, setDesarrollo] = useState("ALL");

	useEffect(() => {
		setList(data);
	}, [data]);

	const handleClean = () => {
		setActionFilter("all");
		setSegmento("ALL");
		setDesarrollo("ALL");
		setList(data);
	};

	const handleApplyFilterP = (filter, value = null) => {
		if (!data.length) return;
		switch (filter) {
			case "cliente":
				setList(
					data.filter(
						(l) =>
							l[2] === "CLIENTE - FC" || l[2] === "CLIENTE - FV",
					),
				);
				break;
			case "visita":
				setList(
					data.filter(
						(l) => l[2] === "VISITA - FV" || l[2] === "VISITA - FC",
					),
				);
				break;
			case "segment":
				console.log(value);
				if (value !== "ALL") {
					setList(data.filter((l) => l[3] === value));
				} else {
					setList(data);
				}
				break;
			case "desarrollo":
				console.log(value);
				if (value !== "ALL") {
					setList(data.filter((l) => l[4] === value));
				} else {
					setList(data);
				}
				break;
			default:
				setList(data);
				break;
		}
	};
	const handleApplyFilter = (filter, value = null) => {
		if (!data.length) return;
		switch (filter) {
			case "cliente":
				setList(
					data.filter(
						(l) => l[3] === "CLIENTE - FC" || l[3] === "cliente",
					),
				);
				break;
			case "visita":
				setList(
					data.filter(
						(l) => l[3] === "VISITA - FV" || l[3] === "visita",
					),
				);
				break;
			case "segment":
				console.log(value);
				if (value !== "ALL") {
					setList(data.filter((l) => l[5] === value));
				} else {
					setList(data);
				}
				break;
			case "desarrollo":
				console.log(value);
				if (value !== "ALL") {
					setList(data.filter((l) => l[4] === value));
				} else {
					setList(data);
				}
				break;
			default:
				setList(data);
				break;
		}
	};

	return (
		<>
			{type === "participants" && (
				<Flex justify="between" gap={20} items="center" mt={30}>
					<Flex type="inline" gap={20}>
						<Button
							onClick={() => {
								setActionFilter("all");
								handleApplyFilterP("all");
							}}
							theme={actionFilter === "all" ? "primary" : "light"}
							height={30}
						>
							Ver todo
						</Button>
						<Button
							onClick={() => {
								setActionFilter("cliente");
								handleApplyFilterP("cliente");
							}}
							theme={
								actionFilter === "cliente" ? "primary" : "light"
							}
							height={30}
						>
							Ver clientes
						</Button>
						<Button
							onClick={() => {
								setActionFilter("visita");
								handleApplyFilterP("visita");
							}}
							theme={
								actionFilter === "visita" ? "primary" : "light"
							}
							height={30}
						>
							Ver visitantes
						</Button>
						<Button
							onClick={() => {
								handleClean();
							}}
							theme={"light"}
							height={30}
						>
							Limpiar filtros
						</Button>
					</Flex>

					<Flex type="inline" gap={20}>
						<Select
							value={desarrollo}
							getValue={(v) => {
								setDesarrollo(v);
								handleApplyFilterP("desarrollo", v);
							}}
							style={{ width: 200, maxWidth: 200 }}
							placeholder="Desarrollo"
							otherLess
							options={[
								{
									id: "ALL",
									name: "Ver todo",
								},
								{
									id: "Ciudad Marques",
									name: "Ciudad Marques",
								},
								{
									id: "Castello Meseta",
									name: "Castello Meseta",
								},
								{
									id: "Brianzzas Residencial",
									name: "Brianzzas Residencial",
								},
								{
									id: "Sendai Residencial",
									name: "Sendai Residencial",
								},
								{
									id: "Aurea Lolita Residencial",
									name: "Aurea Lolita Residencial",
								},
								{
									id: "Tossá Residencial",
									name: "Tossá Residencial",
								},
							]}
						/>

						<Select
							value={segmento}
							getValue={(v) => {
								setSegmento(v);
								handleApplyFilterP("segment", v);
							}}
							style={{ width: 200, maxWidth: 200 }}
							placeholder="Segmento"
							otherLess
							options={[
								{
									id: "ALL",
									name: "Ver todo",
								},
								{
									id: "VIS",
									name: "VIS",
								},
								{
									id: "VIM",
									name: "VIM",
								},
								{
									id: "RES",
									name: "RES",
								},
							]}
						/>
					</Flex>
				</Flex>
			)}
			{type === "reportes" && (
				<Flex justify="between" gap={20} items="center" mt={30}>
					<Flex type="inline" gap={20}>
						<Button
							onClick={() => {
								setActionFilter("all");
								handleApplyFilter("all");
							}}
							theme={actionFilter === "all" ? "primary" : "light"}
							height={30}
						>
							Ver todo
						</Button>
						<Button
							onClick={() => {
								setActionFilter("cliente");
								handleApplyFilter("cliente");
							}}
							theme={
								actionFilter === "cliente" ? "primary" : "light"
							}
							height={30}
						>
							Ver clientes
						</Button>
						<Button
							onClick={() => {
								setActionFilter("visita");
								handleApplyFilter("visita");
							}}
							theme={
								actionFilter === "visita" ? "primary" : "light"
							}
							height={30}
						>
							Ver visitantes
						</Button>
					</Flex>

					<Flex type="inline" gap={20}>
						<Select
							value={desarrollo}
							getValue={(v) => {
								setDesarrollo(v);
								handleApplyFilter("desarrollo", v);
							}}
							style={{ width: 200, maxWidth: 200 }}
							placeholder="Desarrollo"
							otherLess
							options={[
								{
									id: "ALL",
									name: "Ver todo",
								},
								{
									id: "Ciudad Marques",
									name: "Ciudad Marques",
								},
								{
									id: "Castello Meseta",
									name: "Castello Meseta",
								},
								{
									id: "Brianzzas Residencial",
									name: "Brianzzas Residencial",
								},
								{
									id: "Sendai Residencial",
									name: "Sendai Residencial",
								},
								{
									id: "Aurea Lolita Residencial",
									name: "Aurea Lolita Residencial",
								},
								{
									id: "Tossá Residencial",
									name: "Tossá Residencial",
								},
							]}
						/>

						<Select
							value={segmento}
							getValue={(v) => {
								setSegmento(v);
								handleApplyFilter("segment", v);
							}}
							style={{ width: 200, maxWidth: 200 }}
							placeholder="Segmento"
							otherLess
							options={[
								{
									id: "ALL",
									name: "Ver todo",
								},
								{
									id: "VIS",
									name: "VIS",
								},
								{
									id: "VIM",
									name: "VIM",
								},
								{
									id: "RES",
									name: "RES",
								},
							]}
						/>
					</Flex>
				</Flex>
			)}

			<Flex overflowX="auto" direction="column">
				<Table>
					<TableHead>
						<TableRow>
							{columns.map((col, index) => (
								<TableHeader key={index}>{col}</TableHeader>
							))}
							{showActions && <TableHeader>Acciones</TableHeader>}
						</TableRow>
					</TableHead>
					<tbody>
						{!!list.length &&
							list.map((row, rowIndex) => (
								<TableRow key={rowIndex}>
									{Object.values(row).map(
										(cell, cellIndex) => (
											<TableCell key={cellIndex}>
												{typeof cell === "boolean" ? (
													<Badge
														theme={
															cell
																? "success"
																: "danger"
														}
														ttrans="upper"
														minW={100}
														width={100}
														weight="600"
													>
														{cell
															? "activo"
															: "inactivo"}
													</Badge>
												) : (
													cell
												)}
											</TableCell>
										),
									)}
									{showActions && (
										<TableCell>
											<Actions>
												<ButtonIcon
													tooltip="Editar asesor"
													theme="pill"
													w={24}
													width={40}
													icon="refresh"
													onClick={() => onEdit(row)}
												/>
												<ButtonIcon
													tooltip={
														!!row.status
															? "Bloquear usuario"
															: "Habilitar usuario"
													}
													theme="pill"
													w={24}
													width={40}
													icon={
														!!row.status
															? "enable"
															: "disable"
													}
													onClick={() =>
														onDelete(row)
													}
												/>
											</Actions>
										</TableCell>
									)}
								</TableRow>
							))}
					</tbody>
				</Table>
				{!list.length && (
					<Flex justify="center" items="center" height={200}>
						<Title opacity="0.4" type="h2" align="center">
							No se estan mostrando resultados
						</Title>
					</Flex>
				)}
			</Flex>
		</>
	);
};

export default MyTable;
