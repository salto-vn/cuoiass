<?php

namespace App\Enums;

use BenSampo\Enum\Enum;

final class ServiceCodeEnum extends Enum
{
    const DRESS = "DRSS";
    const HNM = "HNM";
    const NC = "NC";
    const PHT = "PHT";
    const QUAC = "QUAC";
    const REST = "REST";
    const STD = "STD";
    const TRTR = "TRTR";
    const VN = "VN";
    const XC = "XC";

    public static function getDescription($value): string
    {
        switch ($value){
            case self::DRESS:
                return 'Trang phục';
                break;
            case self::HNM:
                return 'Tuần trăng mật';
                break;
            case self::NC:
                return 'Nhẫn cưới';
                break;
            case self::PHT:
                return 'Hình cưới';
                break;
            case self::REST:
                return 'Hội trường cưới';
                break;
            case self::TRTR:
                return 'Trang trí';
                break;
            case self::VN:
                return 'Văn nghệ';
                break;
            case self::XC:
                return 'Xe cưới';
                break;
            case self::QUAC:
                return 'Mâm quả cưới';
                break;
            default:
                return self::getKey($value);
        }
    }

    public static function getValue(string $key)
    {
        switch ($key){
            case 'Trang phục':
                return self::DRESS;
                break;
            case 'Tuần trăng mật':
                return self::HNM;
                break;
            case 'Nhẫn cưới':
                return self::NC;
                break;
            case 'Hình cưới':
                return self::PHT;
                break;
            case 'Hội trường cưới':
                return self::REST;
                break;
            case 'Trang trí':
                return self::TRTR;
                break;
            case 'Văn nghệ':
                return self::VN;
                break;
            case 'Xe cưới':
                return self::XC;
                break;
            case 'Mâm quả cưới':
                return self::QUAC;
                break;
            default:
                return self::getValue($key);
        }
    }
}
