type Props = { text: string; onClick: () => void }

const PromptSuggestionButton = ({ text, onClick }: Props) => {
  return (
    <button className="prompt-suggestion-button" onClick={onClick}>{text}</button>
  )
}

export default PromptSuggestionButton