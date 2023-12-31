<?php

/**
 * src/Entity/User.php
 *
 * @license https://opensource.org/licenses/MIT MIT License
 * @link    https://www.etsisi.upm.es/ ETS de Ingeniería de Sistemas Informáticos
 */

namespace TDW\ACiencia\Entity;

use Doctrine\ORM\Mapping as ORM;
use InvalidArgumentException;
use JetBrains\PhpStorm\ArrayShape;
use JsonSerializable;
use Stringable;
use ValueError;

#[ORM\Entity, ORM\Table(name: "user")]
#[ORM\UniqueConstraint(name: "IDX_UNIQ_USERNAME", columns: [ "username" ])]
#[ORM\UniqueConstraint(name: "IDX_UNIQ_EMAIL", columns: [ "email" ])]
class User implements JsonSerializable, Stringable
{
    #[ORM\Column(
        name: "id",
        type: "integer",
        nullable: false
    )]
    #[ORM\Id(), ORM\GeneratedValue(strategy: "IDENTITY")]
    protected int $id;

    #[ORM\Column(
        name: "username",
        type: "string",
        length: 32,
        unique: true,
        nullable: false
    )]
    protected string $username;

    #[ORM\Column(
        name: "email",
        type: "string",
        length: 60,
        unique: true,
        nullable: false
    )]
    protected string $email;

    #[ORM\Column(
        name: "password",
        type: "string",
        length: 60,
        nullable: false
    )]
    protected string $password_hash;

    #[ORM\Column(
        name: "role",
        type: "string",
        length: 10,
        nullable: false,
        enumType: Role::class
    )]
    protected Role $role;

    #[ORM\Column(
        name: "name",
        type: "string",
        length: 32,
        nullable: false,
        options: ["default"=>""]
    )]
    protected string $name;


    #[ORM\Column(
        name: "status",
        type: "boolean",
        nullable: false,
        options: ["default"=>true]
    )]
    protected bool $status;

    #[ORM\Column(
        name: "birthdate",
        type: "string",
        length: 32,
        nullable: false,
        options: ["default"=>""]
    )]
    protected string $birthdate;
    /**
     * User constructor.
     *
     * @param string $username username
     * @param string $email email
     * @param string $password password
     * @param Role|string $role Role::*
     *
     * @throws InvalidArgumentException
     */
    public function __construct(
        string $username = '',
        string $email = '',
        string $password = '',
        Role|string $role = Role::READER,
        string $name = '',
        bool $status=true,
        string $birthdate = ''
    ) {
        $this->id       = 0;
        $this->username = $username;
        $this->email    = $email;
        $this->setPassword($password);
        $this->setRole($role);
        $this->name = $name;
        $this->status= $status;
        $this->birthdate = $birthdate;
    }

    /**
     * @return int User id
     */
    public function getId(): int
    {
        return $this->id;
    }

    /**
     * Get username
     *
     * @return string
     */
    public function getUsername(): string
    {
        return $this->username;
    }

    /**
     * Set username
     *
     * @param string $username username
     * @return void
     */
    public function setUsername(string $username): void
    {
        $this->username = $username;
    }

    /**
     * Get user e-mail
     *
     * @return string
     */
    public function getEmail(): string
    {
        return $this->email;
    }

    /**
     * Set user e-mail
     *
     * @param string $email email
     * @return void
     */
    public function setEmail(string $email): void
    {
        $this->email = $email;
    }





    /**
     * @param Role|string $role
     * @return bool
     */
    public function hasRole(Role|string $role): bool
    {
        if (!$role instanceof Role) {
            $role = Role::from($role);
        }
        return match ($role) {
            Role::READER => true,
            Role::WRITER => ($this->role === Role::WRITER),
            default => false
        };
    }

    /**
     * @param Role|string $newRole [ Role::READER | Role::WRITER | 'reader' | 'writer' ]
     * @return void
     * @throws InvalidArgumentException
     */
    public function setRole(Role|string $newRole): void
    {
        try {
            $this->role = ($newRole instanceof Role)
                ? $newRole
                : Role::from(strtolower($newRole));
        } catch (ValueError) {
            throw new InvalidArgumentException('Invalid Role');
        }
    }

    /**
     * @return Role[] [ READER ] | [ READER , WRITER ]
     */
    public function getRoles(): array
    {
        $roles = array_filter(
            Role::cases(),
            fn($myRole) => $this->hasRole($myRole)
        );

        return $roles;
    }

    /**
     * Get the hashed password
     *
     * @return string
     */
    public function getPassword(): string
    {
        return $this->password_hash;
    }

    /**
     * @param string $password password
     * @return void
     */
    public function setPassword(string $password): void
    {
        $this->password_hash = strval(password_hash($password, PASSWORD_DEFAULT));
    }


    /**
     * Get name
     *
     * @return string
     */
    public function getName(): string
    {
        return $this->name;
    }

    /**
     * Set name
     *
     * @param string $name name
     * @return void
     */
    public function setName(string $name): void
    {
        $this->name = $name;
    }



    /**
     * Get status
     *
     * @return bool
     */
    public function getStatus(): bool
    {
        return $this->status;
    }

    /**
     * Set status
     *
     * @param bool $status status
     * @return void
     */
    public function setStatus(bool $status): void
    {
        $this->status = $status;
    }

        /**
     * Get birthdate
     *
     * @return string
     */
    public function getBirthdate(): string
    {
        return $this->birthdate;
    }

    /**
     * Set birthdate
     *
     * @param string $birthdate birthdate
     * @return void
     */
    public function setBirthdate(string $birthdate): void
    {
        $this->birthdate = $birthdate;
    }




    /**
     * Verifies that the given hash matches the user password.
     *
     * @param string $password password
     * @return boolean
     */
    public function validatePassword(string $password): bool
    {
        return password_verify($password, $this->password_hash);
    }

    public function __toString(): string
    {
        return
            sprintf(
                '[%s: (id=%04d, username="%s", email="%s", role="%s", name="%s", status="%s", birthdate="%s")]',
                basename(self::class),
                $this->getId(),
                $this->getUsername(),
                $this->getEmail(),
                $this->role->name,
                $this->getName(),
                $this->getStatus(),
                $this->getBirthdate(),
            );
    }

    /**
     * @see JsonSerializable
     */
    #[ArrayShape(['user' => "array"])]
    public function jsonSerialize(): mixed
    {
        return [
            'user' => [
                'id' => $this->getId(),
                'username' => $this->getUsername(),
                'email' => $this->getEmail(),
                'role' => $this->role->name,
                'name' => $this->getName(),
                'status' => $this->getStatus(),
                'birthdate' => $this->getBirthdate(),
            ]
        ];
    }
}
