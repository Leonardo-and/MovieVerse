interface ShortTextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  maxLength?: number
  children: string | React.ReactNode
}

export function ShortText({
  children,
  maxLength = 100,
  ...rest
}: ShortTextProps) {
  if (typeof children === 'string') {
    const shortenedText = children.slice(0, maxLength)
    return <p {...rest}>{shortenedText}...</p>
  }
  return <div {...rest}>{children}</div>
}
