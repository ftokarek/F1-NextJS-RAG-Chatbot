import PromptSuggestionButton from "./PromptSuggestionButton"

type Props = { onPromptClick: (text: string) => void }

const PromptSuggestionRow = ({ onPromptClick }: Props) => {
  const prompts = [
    "What happened in the last race?",
    "Who leads the drivers' standings?",
    "What are Ferrari's upgrades this season?"
  ]
  return (
    <div className="prompt-suggestion-row">
      {prompts.map((p, index) => (
        <PromptSuggestionButton key={`suggestion-${index}`} text={p} onClick={() => onPromptClick(p)} />
      ))}
    </div>
  )
}

export default PromptSuggestionRow