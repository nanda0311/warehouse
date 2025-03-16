import { cn } from "@/lib/utils"

const Alert = React.forwardRef<
  React.ElementRef<"div">,
  React
.ComponentPropsWithoutRef<"div">
>((
{
  className, children,
  ...props
}
, ref) =>
{
  return (
    <div
      className={cn(
        "relative w-full rounded-lg border p-4 [&>svg]:h-4 [&>svg]:w-4",
        className
      )}
      role="alert"
      ref={ref}
      {...props}
    >
      {children}
    </div>
  )
}
)
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  React.ElementRef<"h5">,
  React
.ComponentPropsWithoutRef<"h5">
>((
{
  className, children,
  ...props
}
, ref) =>
{
  return (
    <h5
      className={cn("mb-1 font-medium leading-none tracking-tight", className)}
      {...props}
      ref={ref}
    >
      {children}
    </h5>
  )
}
)
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  React.ElementRef<"div">,
  React
.ComponentPropsWithoutRef<"div">
>((
{
  className, children,
  ...props
}
, ref) =>
{
  return (
    <div
      className={cn("text-sm [&:not(:first-child)]:mt-1", className)}
      {...props}
      ref={ref}
    >
      {children}
    </div>
  )
}
)
AlertDescription.displayName = "AlertDescription"

const AlertCircle = React.forwardRef<
  React.ElementRef<"svg">,
  React
.ComponentPropsWithoutRef<"svg">
>((
{
  className,
  ...props
}
, ref) =>
{
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-4 w-4", className)}
      ref={ref}
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  )
}
)
AlertCircle.displayName = "AlertCircle"

export { Alert, AlertTitle, AlertDescription, AlertCircle }

