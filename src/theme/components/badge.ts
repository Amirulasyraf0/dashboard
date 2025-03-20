import { mode } from '@chakra-ui/theme-tools';
export const badgeStyles = {
	components: {
		Badge: {
			baseStyle: {
				borderRadius: '6px',
				lineHeight: '100%',
				padding: '7px',
				paddingLeft: '12px',
				paddingRight: '12px'
			},
			variants: {
				outline: () => ({
					borderRadius: '6px'
				}),
				brand: (props: any) => ({
					bg: mode('brand.500', 'brand.400')(props),
					color: 'white',
					_focus: {
						bg: mode('brand.500', 'brand.400')(props)
					},
					_active: {
						bg: mode('brand.500', 'brand.400')(props)
					},
					_hover: {
						bg: mode('brand.600', 'brand.400')(props)
					}
				})
			}
		}
	}
};
