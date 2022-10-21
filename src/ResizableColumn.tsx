import React, { useRef } from "react";

const itemStyle: React.CSSProperties = {
  borderRight: "1px solid black",
  boxSizing: "border-box",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  overflow: "hidden",
};

type DragData = {
  isDragging: boolean;
  currentColumn: number;
  startX: number;
  columns: number[];
};

function ResizableColumn() {
  const divRef = useRef<HTMLDivElement>(null);
  const dragData = useRef<DragData>({
    isDragging: false,
    currentColumn: -1,
    startX: 0,
    columns: [],
  });

  const getColumnsWidth = () => {
    if (!divRef.current) return;
    const templateColumns = window.getComputedStyle(
      divRef.current
    ).gridTemplateColumns;
    const result = templateColumns
      .split(" ")
      .map((text) => Number(text.replace("px", "")));
    return result;
  };

  const CheckGridBorder = (x: number, columns: number[]) => {
    let accumulator = 0;
    let isOnBorder = false;
    let columnIndex = 0;
    for (let i = 0; i < columns.length - 1; i++) {
      accumulator += columns[i];
      if (Math.abs(x - accumulator) <= 4) {
        isOnBorder = true;
        columnIndex = i;
        break;
      }
    }

    return { isOnBorder, columnIndex };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!divRef.current) return;
    const columns = getColumnsWidth();
    if (!columns) return;
    const { clientX, buttons } = e;
    const { offsetLeft } = divRef.current;
    const x = clientX - offsetLeft;

    const isLeftButtonPressed = buttons === 1;
    const { isDragging } = dragData.current;

    if (isDragging) {
      if (isLeftButtonPressed) dragging(x);
      else endDragging();
      return;
    }

    const { isOnBorder, columnIndex } = CheckGridBorder(x, columns);

    if (isLeftButtonPressed && !isDragging) {
      startDragging({
        columnIndex: isOnBorder ? columnIndex : -1,
        startX: x,
        columns,
      });
      return;
    }

    divRef.current.style.cursor = isOnBorder ? "e-resize" : "";
  };

  const startDragging = ({
    columnIndex,
    columns,
    startX,
  }: {
    columnIndex: number;
    startX: number;
    columns: number[];
  }) => {
    dragData.current = {
      currentColumn: columnIndex,
      isDragging: true,
      startX,
      columns,
    };
  };

  const endDragging = () => {
    if (!divRef.current) return;
    dragData.current = {
      currentColumn: -1,
      isDragging: false,
      startX: 0,
      columns: [],
    };
  };

  const dragging = (x: number) => {
    const { currentColumn, startX, columns } = dragData.current;
    if (currentColumn < 0 || !divRef.current) return;
    const mouseDragAmount = x - startX;
    const minColumnWidth = 12;
    const maxDragAmount = columns[currentColumn + 1] - minColumnWidth;
    const minDragAmount = -(columns[currentColumn] - minColumnWidth);
    const columnDragAmount = Math.max(
      Math.min(mouseDragAmount, maxDragAmount),
      minDragAmount
    );
    const newColumns = [...columns];
    newColumns[currentColumn] += columnDragAmount;
    newColumns[currentColumn + 1] -= columnDragAmount;
    const templateColumns = newColumns.reduce((prev, width, i) => {
      return prev + width + "px ";
    }, "");
    divRef.current.style.gridTemplateColumns = templateColumns;
    divRef.current.style.cursor = "e-resize";
  };

  return (
    <div
      ref={divRef}
      style={{
        width: "600px",
        height: "200px",
        display: "grid",
        gridAutoFlow: "column",
        border: "1px solid black",
        position: "absolute",
        top: "50%",
        left: "50%",
        boxSizing: "border-box",
        gridAutoColumns: "1fr",
      }}
      onMouseMove={handleMouseMove}
      onDragStart={(e) => e.preventDefault()}
    >
      <div style={itemStyle}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </div>
      <div style={itemStyle} />
      <div style={itemStyle} />
      <div style={itemStyle} />
      <div style={itemStyle} />
      <div />
    </div>
  );
}

export default ResizableColumn;
