function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
  const { color = 'black' } = props
  return (
    <svg width={38.366} height={1.304} viewBox="0 0 38.366 1.304" {...props} preserveAspectRatio="none">
      <path
        data-name="Pfad 11"
        d="M.108.106l1.048 1.048h36.052L38.256.106"
        fill="none"
        stroke={color}
        strokeWidth={0.3}
      />
    </svg>
  )
}

export default SvgComponent
