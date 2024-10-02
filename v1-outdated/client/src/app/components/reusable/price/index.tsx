import clsx from "clsx"

interface IPrice extends React.ComponentProps<"p"> {
  amount: number
  className?: string
}

const Price: React.FC<IPrice> = ({ amount, className }) => (
  <p suppressHydrationWarning={true} className={className}>
    {`${new Intl.NumberFormat(undefined, {
      currencyDisplay: "narrowSymbol",
    }).format(amount)}`}
    <span className={clsx("ml-1 inline")}>{"lei"}</span>
  </p>
)

export { Price }
