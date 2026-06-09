type AnimatedTextProps = {
  text: string;
};

export function AnimatedText({ text }: AnimatedTextProps) {
  const tokens = text.split(/(\s+)/);

  return (
    <p className="whitespace-pre-wrap text-[14.5px] font-light leading-relaxed">
      {tokens.map((token, index) =>
        token.trim() === "" ? (
          <span key={index}>{token}</span>
        ) : (
          <span key={index} className="inline-block animate-word-in">
            {token}
          </span>
        ),
      )}
    </p>
  );
}
