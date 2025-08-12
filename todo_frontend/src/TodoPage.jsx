import React, { useMemo, useState } from "react";
import "./TodoPage.css";

/* Simple inline SVG icon components to match Figma components (stroke per style_15) */
const IconCheckCircle = ({ size = 25, active = false }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={active ? "var(--color-34c759)" : "none"}
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="9" stroke="var(--icon-stroke)" strokeWidth="1.5" fill={active ? "var(--color-34c759)" : "none"} />
    <path
      d="M8 12.5l2.5 2.5L16 9.5"
      stroke={active ? "#fff" : "var(--icon-stroke)"}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

const IconTrash = ({ size = 25 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path d="M9 4h6" stroke="var(--icon-stroke)" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M4 6h16" stroke="var(--icon-stroke)" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M6 6l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12" stroke="var(--icon-stroke)" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M10 10v8M14 10v8" stroke="var(--icon-stroke)" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const IconPencil = ({ size = 25 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M4 20l4.5-1 9.5-9.5a2.828 2.828 0 1 0-4-4L4.5 15 4 20z"
      stroke="var(--icon-stroke)"
      strokeWidth="1.5"
      fill="none"
      strokeLinejoin="round"
    />
    <path d="M13 5l4 4" stroke="var(--icon-stroke)" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const IconCalendar = ({ size = 32 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <rect x="3" y="5" width="18" height="16" rx="2" stroke="#fff" strokeWidth="1.5" />
    <path d="M3 9h18" stroke="#fff" strokeWidth="1.5" />
    <path d="M8 3v4M16 3v4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const IconPlaylist = ({ size = 30 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
    <circle cx="5" cy="7" r="1" fill="currentColor" />
    <path d="M8 7h11M5 12h14M5 17h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const IconTick = ({ size = 30 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 12.5l4 4L18 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function TodoPage() {
  const [todos, setTodos] = useState([
    { id: 1, title: "TODO TITLE", subtitle: "TODO SUB TITLE", completed: false },
    { id: 2, title: "TODO TITLE", subtitle: "TODO SUB TITLE", completed: false },
    { id: 3, title: "TODO TITLE", subtitle: "TODO SUB TITLE", completed: false },
    { id: 4, title: "TODO TITLE", subtitle: "TODO SUB TITLE", completed: false },
  ]);

  const [filter, setFilter] = useState("all"); // 'all' | 'completed'

  const filteredTodos = useMemo(() => {
    return filter === "completed" ? todos.filter(t => t.completed) : todos;
  }, [filter, todos]);

  const toggleComplete = (id) => {
    setTodos(prev => prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const removeTodo = (id) => {
    setTodos(prev => prev.filter(t => t.id !== id));
  };

  const editTodo = (id) => {
    const t = todos.find(x => x.id === id);
    if (!t) return;
    const newTitle = window.prompt("Edit title", t.title) ?? t.title;
    const newSubtitle = window.prompt("Edit subtitle", t.subtitle) ?? t.subtitle;
    setTodos(prev => prev.map(x => (x.id === id ? { ...x, title: newTitle, subtitle: newSubtitle } : x)));
  };

  const addTodo = () => {
    const title = window.prompt("New TODO title", "TODO TITLE");
    if (!title) return;
    const subtitle = window.prompt("Subtitle", "TODO SUB TITLE") ?? "TODO SUB TITLE";
    setTodos(prev => [
      ...prev,
      { id: Date.now(), title, subtitle, completed: false },
    ]);
  };

  return (
    <div className="todo-page" role="main" aria-label="TODO PAGE">
      {/* Status bar spacing (visual balance) */}
      <div className="status-spacer" />

      {/* App Bar */}
      <header className="appbar">
        <div className="appbar__title" aria-label="App Title">TODO APP</div>
        <div className="appbar__icon" aria-hidden="true">
          <IconCalendar />
        </div>
      </header>

      {/* Content / Todos list */}
      <section className="todos">
        {filteredTodos.map(todo => (
          <article
            key={todo.id}
            className={`todo-card${todo.completed ? " completed" : ""}`}
            aria-label={`Todo item ${todo.title}`}
          >
            <div className="todo-card__text">
              <h3 className="todo-card__title">{todo.title}</h3>
              <p className="todo-card__subtitle">{todo.subtitle}</p>
            </div>
            <div className="todo-card__actions">
              <button
                className="icon-btn"
                aria-label="Edit todo"
                title="Edit"
                onClick={() => editTodo(todo.id)}
              >
                <IconPencil />
              </button>
              <button
                className="icon-btn"
                aria-label="Delete todo"
                title="Delete"
                onClick={() => removeTodo(todo.id)}
              >
                <IconTrash />
              </button>
              <button
                className="icon-btn"
                aria-label={todo.completed ? "Mark as incomplete" : "Mark as complete"}
                title={todo.completed ? "Mark as incomplete" : "Mark as complete"}
                onClick={() => toggleComplete(todo.id)}
              >
                <IconCheckCircle active={todo.completed} />
              </button>
            </div>
          </article>
        ))}
      </section>

      {/* Floating Add New ToDo Button */}
      <button className="fab" onClick={addTodo} aria-label="Add New ToDo">
        <span className="fab__plus" aria-hidden="true" />
      </button>

      {/* Bottom Navigation */}
      <nav className="bottom-nav" aria-label="Todo filters">
        <button
          className={`bottom-nav__item${filter === "all" ? " active" : ""}`}
          onClick={() => setFilter("all")}
          aria-label="Show all todos"
        >
          <div className="bottom-nav__icon" aria-hidden="true">
            <IconPlaylist />
          </div>
          <div className="bottom-nav__label">All</div>
        </button>
        <button
          className={`bottom-nav__item${filter === "completed" ? " active" : ""}`}
          onClick={() => setFilter("completed")}
          aria-label="Show completed todos"
        >
          <div className="bottom-nav__icon" aria-hidden="true">
            <IconTick />
          </div>
          <div className="bottom-nav__label">Completed</div>
        </button>
      </nav>
    </div>
  );
}
