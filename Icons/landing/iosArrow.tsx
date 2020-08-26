function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
  const { color = 'white' } = props

  return (
    <svg {...props} width={13.503} height="auto" viewBox="0 0 13.503 23.616" preserveAspectRatio="xMidYMid meet">
      <path
        data-name="Icon ionic-ios-arrow-forward"
        d="M9.433 11.804L.496 2.874a1.681 1.681 0 010-2.384 1.7 1.7 0 012.391 0l10.125 10.114a1.685 1.685 0 01.049 2.327L2.894 23.124A1.688 1.688 0 01.503 20.74z"
        fill={color}
      />
    </svg>
  )
}

export default SvgComponent
