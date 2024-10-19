import { TouchableOpacity , Text} from 'react-native'



const CustomButton = ({title ,  handlePress , containerStyle , isLoading , textStyle} : any) => {
  return (
    <TouchableOpacity
    onPress={ handlePress}
    activeOpacity={0.7}
    
    className={`bg-secondary rounded-xl min-h-[62px] justify-center items-center ${containerStyle} ${isLoading ? 'opacity-50' : '' }`} disabled={isLoading}>
       <Text className={`text-primary font-psemibold text-lg ${textStyle} `}>

        {title}
       </Text>
    </TouchableOpacity>
  )
}

export default CustomButton