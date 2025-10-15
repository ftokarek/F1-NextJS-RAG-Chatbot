type Props = { message: { role: string; content: string } }

const Bubble = ({ message }: Props) => {
  const { content, role } = message
  const cls = `${role} bubble`
  return <div className={cls}>{content}</div>
}

export default Bubble